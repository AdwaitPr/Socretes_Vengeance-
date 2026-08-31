1. **Understand the problem**:
   The user noticed that when clicking on an exhibit in the Atrium, the camera does not show the exhibit right in front of them, especially after the timeline has been modified and time has passed.
2. **Root Cause**:
   - In `AtriumScene.tsx`, the `carouselGroupRef` rotates continuously when the user is in the `ATRIUM` sector (`carouselGroupRef.current.rotation.y += delta * 0.015`).
   - However, in `CameraRig.tsx`, when the user clicks an exhibit and changes the sector to `INSPECT`, the target camera position `destPos` and `destLook` are calculated using only the exhibit's base index/angle `(idx / total) * Math.PI * 2`. It completely ignores the rotation applied to the carousel over time.
   - Therefore, the camera navigates to where the exhibit *started*, rather than where it *currently is*.
3. **Proposed Fix**:
   - Add a `carouselRotation` state to the global `useMuseumStore`.
   - Update `AtriumScene.tsx` to sync the current `carouselGroupRef.current.rotation.y` to the global store, or alternatively track `carouselRotation` manually in `AtriumScene.tsx` and just have `CameraRig.tsx` read it from the global store.
   - *Better yet*, update `useMuseumStore.ts` to include `carouselRotation: 0` and `setCarouselRotation: (rot: number) => void`.
   - In `AtriumScene.tsx`, inside `useFrame`, when modifying `carouselGroupRef.current.rotation.y`, also call `setCarouselRotation(carouselGroupRef.current.rotation.y)` (or similar logic). To avoid triggering React renders in `useFrame`, it is better to mutate a variable or use Zustand's transient state. Actually, just exporting a global variable from `AtriumScene.tsx` or using Zustand's `getState()` might be better. Let's use `useMuseumStore.setState({ carouselRotation })` for non-reactive updates, but read it reactively in `CameraRig.tsx`'s `useEffect`, or even non-reactively. Wait, `CameraRig.tsx` computes `destPos` in a `useEffect` that depends on `currentSector` and `activeArtifactId`.
   - Actually, a simple `export let globalCarouselRotation = 0;` in `AtriumScene.tsx` (or a dedicated file) updated in `useFrame` will work. Then in `CameraRig.tsx`, we can just read `globalCarouselRotation` when computing `destPos`.
4. **Implementation details**:
   - `src/museum/scenes/AtriumScene.tsx`:
     ```typescript
     export let globalCarouselRotation = 0;
     // ...
     useFrame((_, delta) => {
       if (carouselGroupRef.current && currentSector === 'ATRIUM') {
         carouselGroupRef.current.rotation.y += delta * 0.015;
         globalCarouselRotation = carouselGroupRef.current.rotation.y;
       }
     });
     ```
   - `src/museum/canvas/CameraRig.tsx`:
     ```typescript
     import { globalCarouselRotation } from '../scenes/AtriumScene';
     // ...
     if (currentSector === 'INSPECT' && activeArtifactId) {
       const idx = EXHIBITS_DATA.findIndex((e) => e.id === activeArtifactId);
       const total = EXHIBITS_DATA.length;
       const baseAngle = (idx / total) * Math.PI * 2;
       const finalAngle = baseAngle + globalCarouselRotation;
       const ax = Math.sin(finalAngle) * 12.5;
       const az = Math.cos(finalAngle) * 10.5;
     ```
5. **Pre-commit**: Complete pre-commit instructions.
6. **Submit**: Commit and submit.
