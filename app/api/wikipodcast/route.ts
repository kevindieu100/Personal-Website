import { NextRequest, NextResponse } from 'next/server';
import { validateWikipediaUrl, fetchWikipediaArticle } from '@/lib/wikipedia';
import { generatePodcastScript, Tone } from '@/lib/podcast';
import { generateSpeech } from '@/lib/elevenlabs';
import { getVoiceById, getDefaultVoice } from '@/lib/voices';

interface RequestBody {
  url: string;
  voiceId: string;
  tone?: Tone;
}

interface SuccessResponse {
  title: string;
  script: string;
  audioBase64: string;
  mimeType: string;
}

interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
  console.log('[wikipodcast] Starting request...');
  
  // Check API key first
  const apiKey = process.env.ELEVENLABS_API_KEY;
  console.log('[wikipodcast] API key exists:', !!apiKey);
  console.log('[wikipodcast] API key length:', apiKey?.length || 0);
  
  if (!apiKey) {
    console.error('[wikipodcast] ELEVENLABS_API_KEY not found in environment');
    return NextResponse.json({ error: 'Server configuration error: API key missing' }, { status: 500 });
  }

  try {
    console.log('[wikipodcast] Parsing request body...');
    const body: RequestBody = await request.json();
    const { url, voiceId, tone = 'neutral' } = body;
    console.log('[wikipodcast] Request body:', { url, voiceId, tone });

    // Validate inputs
    if (!url || typeof url !== 'string') {
      console.log('[wikipodcast] URL validation failed');
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Validate Wikipedia URL
    console.log('[wikipodcast] Validating Wikipedia URL...');
    const urlValidation = validateWikipediaUrl(url);
    console.log('[wikipodcast] URL validation result:', urlValidation);
    
    if (!urlValidation.valid || !urlValidation.title) {
      return NextResponse.json(
        { error: urlValidation.error || 'Invalid Wikipedia URL' },
        { status: 400 }
      );
    }

    // Validate voice
    const voice = getVoiceById(voiceId) || getDefaultVoice();
    console.log('[wikipodcast] Selected voice:', voice.name);

    // Validate tone
    const validTones: Tone[] = ['neutral', 'energetic', 'documentary'];
    const selectedTone: Tone = validTones.includes(tone) ? tone : 'neutral';

    // Fetch Wikipedia article
    console.log('[wikipodcast] Fetching Wikipedia article...');
    const articleResult = await fetchWikipediaArticle(urlValidation.title);
    
    if ('error' in articleResult) {
      console.log('[wikipodcast] Wikipedia fetch error:', articleResult.error);
      return NextResponse.json({ error: articleResult.error }, { status: 400 });
    }
    console.log('[wikipodcast] Article fetched:', articleResult.title, 'Length:', articleResult.extract?.length);

    // Generate podcast script
    console.log('[wikipodcast] Generating script...');
    const script = generatePodcastScript({
      article: articleResult,
      tone: selectedTone,
    });
    console.log('[wikipodcast] Script generated. Length:', script.length);

    // Generate speech
    console.log('[wikipodcast] Calling ElevenLabs TTS...');
    const speechResult = await generateSpeech({
      text: script,
      voiceId: voice.id,
    });

    if ('error' in speechResult) {
      console.log('[wikipodcast] ElevenLabs error:', speechResult.error);
      return NextResponse.json({ error: speechResult.error }, { status: 500 });
    }
    console.log('[wikipodcast] Speech generated. Audio size:', speechResult.audioBase64.length);

    console.log('[wikipodcast] Success! Returning response...');
    return NextResponse.json({
      title: articleResult.title,
      script,
      audioBase64: speechResult.audioBase64,
      mimeType: speechResult.mimeType,
    });
  } catch (err) {
    console.error('[wikipodcast] Caught error:', err);
    console.error('[wikipodcast] Error type:', typeof err);
    console.error('[wikipodcast] Error name:', err instanceof Error ? err.name : 'unknown');
    console.error('[wikipodcast] Error message:', err instanceof Error ? err.message : String(err));
    console.error('[wikipodcast] Error stack:', err instanceof Error ? err.stack : 'no stack');
    
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export const maxDuration = 30;
