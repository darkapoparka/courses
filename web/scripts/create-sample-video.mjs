import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
// Original, silent 24-second UI teaching sample. No remote assets or proprietary fonts.
const target = path.resolve("public/sample");
await mkdir(target, { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent('<canvas width="1280" height="720"></canvas>');
  const bytes = await page.evaluate(async () => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    const chapters = [
      ["01 / START WITH A GOAL", "What are you trying to make?", "A clear question is a useful starting point."],
      ["02 / ADD THE CONTEXT", "Who is this for?", "Describe the audience, constraints and purpose."],
      ["03 / SHAPE THE RESULT", "What would be useful?", "A draft. A checklist. A small working example."],
      ["04 / CHECK AND REVISE", "Read. Question. Improve.", "Look for assumptions before you use the result."],
    ];
    const stream = canvas.captureStream(12);
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9", videoBitsPerSecond: 700000 });
    const chunks = [];
    recorder.ondataavailable = (event) => chunks.push(event.data);
    const done = new Promise((resolve) => { recorder.onstop = async () => resolve(Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer()))); });
    const started = performance.now();
    function draw() {
      const elapsed = (performance.now() - started) / 1000;
      const index = Math.min(3, Math.floor(elapsed / 6));
      context.fillStyle = "#172f37"; context.fillRect(0,0,1280,720);
      context.fillStyle = "#98c9cf"; context.font = "600 22px Arial"; context.fillText("COURSES / ORIGINAL UI SAMPLE",72,74);
      context.font = "600 21px Arial"; context.fillText(chapters[index][0],72,228);
      context.fillStyle = "white"; context.font = "bold 52px Arial"; context.fillText(chapters[index][1],72,320);
      context.fillStyle = "#d4e3e7"; context.font = "27px Arial"; context.fillText(chapters[index][2],72,385);
      context.fillStyle = "#37535d"; context.fillRect(72,530,1136,4);
      context.fillStyle = "#b4dee2"; context.fillRect(72,530,1136*Math.min(elapsed/24,1),4);
      context.font = "19px Arial"; context.fillText("A better brief / Silent, captioned sample / Not a full course lesson",72,620);
      if(elapsed < 24) requestAnimationFrame(draw); else recorder.stop();
    }
    draw(); recorder.start(); return await done;
  });
  await writeFile(path.join(target, "a-better-brief.webm"), Buffer.from(bytes));
  console.log("Created original 24-second sample video:", bytes.length, "bytes");
} finally { await browser.close(); }
