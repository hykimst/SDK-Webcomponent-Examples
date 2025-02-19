import { LOG, DEBUG, ERROR } from './printer';

export const registerTexture = async (sdk: any) => {
  LOG('onShowcaseLoaded', sdk);

  // Step 1: Wait until the sdk is ready
  await sdk.App.state.waitUntil(
    (state: any) => state.phase === sdk.App.Phase.PLAYING
  );

  try {
    LOG('Connected to SDK:', sdk);
    var tagId = 'tkapp8ynre7di9pxrzkcpwqfa';

    // Take me to the tag that I've updated.
    var done = true;
    sdk.Camera.pose.subscribe(function (pose: any) {
      const startRotation = { x: -2.3478604260139115, y: 177.69234680289787 };

      if (
        pose.rotation.x === startRotation.x &&
        pose.rotation.y === startRotation.y &&
        pose.sweep === 'iurrammyaagwqidiy5p4ga8sb' &&
        done
      ) {
        sdk.Mode.moveTo(sdk.Mode.Mode.DOLLHOUSE, {
          position: {
            x: 9.439560918829466,
            y: 3.010649624939236,
            z: -4.413605570526337,
          },
          rotation: { x: -19.312825939506254, y: -100.72789183458097 },
          transition: sdk.Mode.TransitionType.FLY,
          zoom: 5,
        })
          .then(function (nextMode: any) {
            // Move successful.
            LOG('Arrived at new view mode ', nextMode);
          })
          .catch(function (error: any) {
            // Error with moveTo command
            ERROR('MODE.MOVETO ERROR ', error);
          });
        done = false;
      }
    });

    // Option 1 - using public/assets
    sdk.Asset.registerTexture('texturetest1', `/assets/images/happyface.png`);

    // Option 2 - updating base
    // Register a Texture
    // sdk.Asset.registerTexture('texturetest1',`${window.location.origin}/public/assets/images/happyface.png`);

    // OPTION 3 - using absolutepath
    // const absolutePath = "https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--5173--d20a0a75.local-credentialless.webcontainer.io/public/assets/images/happyface.png";
    // sdk.Asset.registerTexture('texturetest1',absolutePath);

    // change the icon of the Tag using the id used in a previous `Asset.registerTexture` call
    DEBUG(`TAG ID: ${tagId}`, null);
    sdk.Tag.editIcon(tagId, 'texturetest1');
    sdk.Tag.open(tagId);

    const modelData = await sdk.Model.getData();
    LOG('Model sid:', modelData.sid);
  } catch (e) {
    ERROR(`Error getting model data:`, e);
  }
};
