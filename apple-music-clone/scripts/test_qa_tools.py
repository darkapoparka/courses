"""Guard pixel diagnostics against resizing, hidden tolerance and archive writes."""
import importlib.util
from pathlib import Path
import unittest
from unittest.mock import patch
from PIL import Image
from qa_identity import APP, reference_viewport

spec = importlib.util.spec_from_file_location('comparison', Path(__file__).with_name('compare-reference.py'))
comparison = importlib.util.module_from_spec(spec)
spec.loader.exec_module(comparison)


class ComparisonTests(unittest.TestCase):
    def test_identical_pixels_are_zero(self):
        image = Image.new('RGB', (2, 2), (40, 80, 120))
        metrics, _ = comparison.pixel_metrics(image, image.copy())
        self.assertEqual(metrics, {'mae': 0, 'over20Percent': 0})

    def test_threshold_is_strict_and_channel_based(self):
        reference = Image.new('RGB', (2, 1), (0, 0, 0))
        candidate = reference.copy()
        candidate.putpixel((0, 0), (20, 0, 0))
        candidate.putpixel((1, 0), (0, 21, 0))
        metrics, _ = comparison.pixel_metrics(reference, candidate)
        self.assertEqual(metrics['over20Percent'], 50)
        self.assertAlmostEqual(metrics['mae'], 41 / 6)

    def test_dimension_mismatch_is_not_resized(self):
        with self.assertRaisesRegex(ValueError, 'Dimension mismatch'):
            comparison.pixel_metrics(Image.new('RGB', (2, 2)), Image.new('RGB', (2, 3)))

    def test_both_original_viewports_are_preserved(self):
        originals = APP / 'reference/originals'
        ordinary = next(originals.glob('e72be564-*.webp')).stem
        taller = next(originals.glob('ffc18eb8-*.webp')).stem
        self.assertEqual(reference_viewport(ordinary), {'width': 1440, 'height': 903})
        self.assertEqual(reference_viewport(taller), {'width': 1440, 'height': 904})

    def test_output_cannot_write_to_reference_archive(self):
        output = APP / 'reference' / 'forbidden-comparison-output'
        with patch('sys.argv', ['compare-reference.py', '--output', str(output)]):
            with self.assertRaisesRegex(ValueError, 'inside .parity-evidence'):
                comparison.main()
        self.assertFalse(output.exists())


if __name__ == '__main__':
    unittest.main()
