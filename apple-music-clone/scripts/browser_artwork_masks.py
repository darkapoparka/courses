"""Decode the actual browser mask and prove that captured player UI is excluded."""

async def assert_release_mask(overlay, index):
    result = await overlay.evaluate('''async (element, index) => {
      const value = getComputedStyle(element).maskImage;
      const uri = JSON.parse(value.slice(4, -1));
      if (!uri.startsWith('data:image/svg+xml,')) throw Error('Expected a vector visibility mask');
      const svg = new DOMParser().parseFromString(decodeURIComponent(uri.split(',')[1]), 'image/svg+xml');
      if (svg.querySelectorAll('path').length !== 1 || svg.querySelector('image,text,script,foreignObject'))
        throw Error('The mask must contain geometry only, never captured interface pixels');
      const image = new Image(); image.src = uri; await image.decode();
      const canvas = document.createElement('canvas'); canvas.width = 208; canvas.height = 63;
      const ctx = canvas.getContext('2d'); ctx.drawImage(image, 0, 0, 208, 63);
      const pixels = ctx.getImageData(0, 0, 208, 63).data;
      let leaks = 0, missingArtwork = 0, excluded = 0, visible = 0;
      for (let y = 0; y < 63; y++) for (let x = 0; x < 208; x++) {
        const worldX = 286 + index * 227 + x + .5;
        const distance = Math.hypot(worldX - Math.max(553, Math.min(1134, worldX)), 840 + y + .5 - 860);
        const alpha = pixels[(y * 208 + x) * 4 + 3];
        if (distance <= 27) { excluded++; if (alpha !== 0) leaks++; }
        if (distance >= 29) { visible++; if (alpha !== 255) missingArtwork++; }
      }
      return {leaks, missingArtwork, excluded, visible, width:image.naturalWidth, height:image.naturalHeight};
    }''', index)
    assert result['leaks'] == 0, (index, result)
    assert result['missingArtwork'] == 0, (index, result)
    assert result['excluded'] > 8000 and result['visible'] > 2000, (index, result)
