"""Tests for the narrow documentation validator, using no repository mutations."""
import importlib.util
from pathlib import Path
import unittest

spec = importlib.util.spec_from_file_location("docs_check", Path(__file__).with_name("check-astra-docs.py"))
assert spec is not None and spec.loader is not None
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


def skill(name="example", description="Use for one specific repository task."):
    return f"---\nname: {name}\ndescription: {description}\n---\n\n" + "Workflow instructions. " * 8


class DocsContractTests(unittest.TestCase):
    def test_valid_skill(self):
        self.assertEqual(module.parse_skill(skill(), "example")["name"], "example")

    def test_wrong_skill_directory(self):
        with self.assertRaises(ValueError):
            module.parse_skill(skill(), "different")

    def test_duplicate_metadata(self):
        with self.assertRaises(ValueError):
            module.parse_skill(skill().replace("name: example", "name: example\nname: other"), "example")

    def test_overbroad_metadata_size(self):
        with self.assertRaises(ValueError):
            module.parse_skill(skill(description="x" * 221), "example")

    def test_unsafe_plain_scalar(self):
        with self.assertRaises(ValueError):
            module.parse_skill(skill(description="Task trigger: with ambiguous YAML syntax"), "example")

    def test_links_ignore_external_fragments_images_and_code(self):
        text = "[local](../a%20b.md#section) [external](https://openai.com/x) [same](#s) ![image](missing.png)\n```text\n[example](not-real.md)\n```\n"
        self.assertEqual(module.internal_targets(text), ["../a b.md"])

    def test_unclosed_frontmatter(self):
        with self.assertRaises(ValueError):
            module.parse_skill("---\nname: example\n", "example")

    def test_generated_block_ignores_surrounding_prose(self):
        block = "<!-- BEGIN:nextjs-agent-rules -->\nkept\n<!-- END:nextjs-agent-rules -->"
        self.assertEqual(module.generated_block("before\n" + block + "\nafter"), block)

    def test_registry_rejects_unpinned_github_source(self):
        data = {"schema_version": 1, "review_date": "2026-09-12", "upstream_skills": {"commit": "a" * 40}, "project_skills": ["example"], "sources": [{"id": "S1", "url": "https://github.com/openai/skills/blob/main/file.md", "status": "reviewed", "reviewed_on": "2026-09-12", "scope": "Example"}]}
        with self.assertRaises(ValueError):
            module.validate_source_register(data)


if __name__ == "__main__":
    unittest.main()
