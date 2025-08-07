import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getScriptById } from '@/lib/scripts-data';
import { checkUserSubscription } from '@/app/actions/subscription';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { id } = await context.params;
    const script = getScriptById(id);
    
    if (!script) {
      return new NextResponse('Script not found', { status: 404 });
    }

    // Check if script requires subscription
    if (script.isPremium) {
      const { hasActiveSubscription } = await checkUserSubscription();
      
      if (!hasActiveSubscription) {
        return new NextResponse('Subscription required', { status: 403 });
      }
    }

    // In a real implementation, you would:
    // 1. Log the download to your database
    // 2. Generate a secure download URL (e.g., from S3)
    // 3. Return the file or redirect to the secure URL
    
    // For now, we'll return a mock response
    const mockFileContent = `# ${script.title}

This is a placeholder for the actual script content.

## Installation

1. Install dependencies
2. Configure environment
3. Run the script

## License

MIT License
`;

    return new NextResponse(mockFileContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${script.id}.txt"`,
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}