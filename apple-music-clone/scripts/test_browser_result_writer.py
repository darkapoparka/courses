"""Exercise bounded recovery for Windows evidence-file replacement races."""
import importlib.util
import sys
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

SCRIPT = Path(__file__).with_name("browser-reference.py")
sys.path.insert(0, str(SCRIPT.parent))
SPEC = importlib.util.spec_from_file_location("browser_reference_writer", SCRIPT)
MODULE = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(MODULE)


class BrowserResultWriterTests(unittest.TestCase):
    def test_permission_error_is_retried_without_swallowing_the_write(self):
        with tempfile.TemporaryDirectory() as directory:
            MODULE.OUT = Path(directory)
            real_replace = Path.replace
            attempts = 0

            def flaky_replace(path, destination):
                nonlocal attempts
                attempts += 1
                if attempts < 3:
                    raise PermissionError(5, "Access is denied")
                return real_replace(path, destination)

            with patch.object(Path, "replace", flaky_replace), patch.object(MODULE.time, "sleep") as sleep:
                MODULE.write_results({"ok": True})

            self.assertEqual(attempts, 3)
            self.assertEqual(sleep.call_count, 2)
            self.assertEqual((MODULE.OUT / "results.json").read_text(encoding="utf-8"), '{\n  "ok": true\n}')

    def test_persistent_permission_error_still_fails(self):
        with tempfile.TemporaryDirectory() as directory:
            MODULE.OUT = Path(directory)
            with patch.object(Path, "replace", side_effect=PermissionError(5, "Access is denied")), patch.object(MODULE.time, "sleep"):
                with self.assertRaises(PermissionError):
                    MODULE.write_results({"ok": False})


if __name__ == "__main__":
    unittest.main()
