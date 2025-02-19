// Import Matterport WebComponent SDK
import '@matterport/webcomponent';
import { registerTexture } from './RegisterTextureExample/myTexture';
import { addSpies } from './SpyExample/addSpies';

// Model ID
const modelSid = 'SxQL3iGyoDo';

// Matterport SDK Key for testing
const MATTPORT_TEST_SDK_KEY = 'yxszifc05b1bidcsqfr60806d';

// Start main
const main = async () => {
  // Log view
  const logview = document.getElementById("logs") || null;
  // Grab Matterport Viewer
  const viewer = document.querySelector('matterport-viewer');
  // Set Model Id here
  viewer?.setAttribute('m', modelSid);
  // Set player size
  viewer?.setAttribute('style', "width:60%");
  // Pass your SDK key here
  viewer?.setAttribute('application-key', MATTPORT_TEST_SDK_KEY);
  // Set your assets folder path here + Matterport assets together
  viewer?.setAttribute('asset-base', 'assets');
  // Initialize SDK here
  viewer?.addEventListener('mpSdkPlaying', async (evt: any) => {
    const mpSdk = evt.detail.mpSdk;

    // Log Camera view
    mpSdk.Camera.pose.subscribe(function (pose:any) {
      // Changes to the Camera pose have occurred.
      // console.log('Current position is ', pose.position);
      // console.log('Rotation angle is ', pose.rotation);
      // console.log('Sweep UUID is ', pose.sweep);
      console.log('View mode is ', pose.mode);
    });

    // Register Texture Example
    registerTexture(mpSdk);

    // Spy Example
    addSpies(mpSdk,logview);
  });
};

// IF Main fails, log error here
main().catch((err) => console.error('Error:', err));
