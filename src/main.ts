// Import Matterport WebComponent SDK
import '@matterport/webcomponent';
import { registerTexture } from './myTexture';

// Model ID
const modelSid = 'SxQL3iGyoDo';

// Matterport SDK Key for testing
const MATTPORT_TEST_SDK_KEY = 'yxszifc05b1bidcsqfr60806d';

// Start main
const main = async () => {
  // Grab Matterport Viewer
  const viewer = document.querySelector('matterport-viewer');
  // Set Model Id here
  viewer?.setAttribute('m', modelSid);
  // Pass your SDK key here
  viewer?.setAttribute('application-key', MATTPORT_TEST_SDK_KEY);
  // Set your assets folder path here + Matterport assets together
  viewer?.setAttribute('asset-base', 'assets');
  // Initialize SDK here
  viewer?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk = evt.detail.mpSdk;

    // Register Texture Example
    registerTexture(mpSdk);

    // Register Texture Example
  });
};

// IF Main fails, log error here
main().catch((err) => console.error('Error:', err));
