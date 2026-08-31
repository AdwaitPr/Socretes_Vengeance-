1. **Understand the problem**: The user states that clicking on exhibits does not show them right in front of the camera, especially when the timeline has been used and some time has passed.
2. **Identify the root cause**: `AtriumScene` rotates the `carouselGroupRef` continuously in `ATRIUM` mode. However, `CameraRig` calculates the camera's `destPos` and `destLook` for the `INSPECT` sector using a fixed angle (`idx / total * Math.PI * 2`), ignoring the current rotation of the carousel. As a result, the camera moves to the artifact's original position, not its current rotated position.
3. **Fix**:
   - Export a simple state object (e.g., `atriumState = { carouselRotation: 0 }`) from `AtriumScene.tsx` (or a global state file) and update it in `useFrame`.
   - In `CameraRig.tsx`, add the current carousel rotation (`atriumState.carouselRotation`) to the base angle when calculating `destPos` and `destLook`.
4. **Pre-commit**: Run pre-commit instructions.
5. **Submit**: Commit and submit the fix.
