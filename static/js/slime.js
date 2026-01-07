// Color scheme
function getThemeColor(variableName) {
  const style = getComputedStyle(document.body);
  return style.getPropertyValue(variableName).trim();
}

// Source - https://stackoverflow.com/a
// Posted by Tim Down, modified by community. See post 'Timeline' for change history
// Retrieved 2026-01-06, License - CC BY-SA 4.0
// Modified
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}

// Simulation parameters
const scale = window.innerWidth > 2000 ? 8 : 4;
const isMobile = window.innerWidth < 1000;
const m = Math.ceil(window.innerWidth / scale);
const n = Math.ceil(window.innerHeight / scale);
const N = isMobile ? 2000 : 1000;
const dt = 1;
const speed = 0.8;
const turnSpeed = 0.3;
const sensorAngle = (45 * Math.PI) / 180;
let isDrawing = false;

class Agent {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

// Initialize canvas and context
const canvas = document.getElementById("hero-canvas");
canvas.width = m * scale;
canvas.height = n * scale - 5;
const ctx = canvas.getContext("2d");

// Create buffer canvas to make drawing faster
const bufferCanvas = document.createElement("canvas");
bufferCanvas.width = m;
bufferCanvas.height = n;
const bufferCtx = bufferCanvas.getContext("2d");
const imageData = bufferCtx.createImageData(m, n);

// Trail map
let trailMap = [];
for (let i = 0; i < m; i++) {
  trailMap[i] = new Array(n).fill(0.0);
}

// Initialize agents
let agents = [];
const cx = isMobile ? m / 2 : (5 * m) / 8;
const cy = isMobile ? (3 * n) / 4 : n / 2;
for (let i = 0; i < N; i++) {
  const angle = (2 * Math.PI * i) / N;
  const x = cx + Math.cos(angle) * Math.floor(Math.random() * 100);
  const y = cy + Math.sin(angle) * Math.floor(Math.random() * 100);
  agents.push(new Agent(x, y, angle));
}

// Utility
function clamp(x, maxVal) {
  return Math.min(maxVal - 0.1, Math.max(0.0, x));
}

// Sensor function
function sense(agent, angleOffset) {
  let sum = 0;
  for (let i = 0; i < 20; i++) {
    const sampleX = Math.floor(
      clamp(agent.x + Math.cos(agent.angle + angleOffset) * i, m),
    );
    const sampleY = Math.floor(
      clamp(agent.y + Math.sin(agent.angle + angleOffset) * i, n),
    );
    sum += trailMap[sampleX][sampleY];
  }
  return sum;
}

// Update agents
function updateAgents() {
  agents.forEach((agent) => {
    const weightForward = sense(agent, 0);
    const weightLeft = sense(agent, sensorAngle);
    const weightRight = sense(agent, -sensorAngle);
    const steerStrength = Math.random();

    if (weightForward < weightLeft && weightForward < weightRight) {
      agent.angle += (steerStrength - 0.5) * 2 * turnSpeed * dt;
    } else if (weightRight > weightLeft && weightRight > weightForward) {
      agent.angle -= steerStrength * turnSpeed * dt;
    } else if (weightLeft > weightRight && weightLeft > weightForward) {
      agent.angle += steerStrength * turnSpeed * dt;
    }

    const dx = Math.cos(agent.angle) * speed * dt;
    const dy = Math.sin(agent.angle) * speed * dt;
    agent.x += dx;
    agent.y += dy;

    if (agent.x < 0 || agent.x >= m || agent.y < 0 || agent.y >= n) {
      agent.x = clamp(agent.x, m);
      agent.y = clamp(agent.y, n);
      agent.angle = Math.random() * 2 * Math.PI;
    }

    const ix = Math.floor(agent.x);
    const iy = Math.floor(agent.y);
    trailMap[ix][iy] = 1.0;
  });
}

// Box blur
function boxBlur(kernelSize, alpha) {
  const tempMap = [];
  for (let i = 0; i < m; i++) tempMap[i] = new Array(n).fill(0.0);
  const half = Math.floor(kernelSize / 2);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0.0,
        count = 0;
      for (let dx = -half; dx <= half; dx++) {
        for (let dy = -half; dy <= half; dy++) {
          const x = i + dx,
            y = j + dy;
          if (x >= 0 && x < m && y >= 0 && y < n) {
            sum += trailMap[x][y];
            count++;
          }
        }
      }
      tempMap[i][j] = sum / count;
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      trailMap[i][j] = tempMap[i][j] * alpha + trailMap[i][j] * (1 - alpha);
    }
  }
}

// Update trail map
function updateTrailMap() {
  boxBlur(4, 0.2);
  const evaporationRate = 0.005;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      trailMap[i][j] = Math.max(trailMap[i][j] - evaporationRate, 0.0);
    }
  }
}

// Mouse interaction
function spawnAgent(event, numAgents) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((event.clientX - rect.left) / scale);
  const y = Math.floor((rect.height - (event.clientY - rect.top)) / scale);
  for (let i = 0; i < numAgents; i++) {
    agents.push(new Agent(x, y, Math.random() * Math.PI * 2));
  }
}

canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));
canvas.addEventListener("mousemove", (event) => {
  if (isDrawing) spawnAgent(event, 3);
});

// Main loop
function update() {
  updateTrailMap();
  updateAgents();

  // Re-fetch in case theme is toggled
  const backgroundRGB = hexToRgb(getThemeColor("--bg"));
  const agentRGB = hexToRgb(getThemeColor("--border"));

  // Update image data
  const data = imageData.data;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const t = Math.min(trailMap[i][j], 1.0);

      const imageJ = n - 1 - j; // Flip vertical axis
      const idx = (imageJ * m + i) * 4;

      data[idx] = (1 - t) * backgroundRGB[0] + t * agentRGB[0]; // Red
      data[idx + 1] = (1 - t) * backgroundRGB[1] + t * agentRGB[1]; // Green
      data[idx + 2] = (1 - t) * backgroundRGB[2] + t * agentRGB[2]; // Blue
      data[idx + 3] = 255; // Alpha
    }
  }

  // Draw to canvas
  bufferCtx.putImageData(imageData, 0, 0);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(bufferCanvas, 0, 0, m, n, 0, 0, canvas.width, canvas.height);

  requestAnimationFrame(update);

  // Blur edges
  const gradientWidth = 100;
  const opaque = `rgba(${backgroundRGB[0]}, ${backgroundRGB[1]}, ${backgroundRGB[2]}, 1)`;
  const transparent = `rgba(${backgroundRGB[0]}, ${backgroundRGB[1]}, ${backgroundRGB[2]}, 0)`;

  // Left gradient: from opaque at the left edge to transparent moving rightwards
  const leftGradient = ctx.createLinearGradient(0, 0, gradientWidth, 0);
  leftGradient.addColorStop(0, opaque);
  leftGradient.addColorStop(1, transparent);
  ctx.fillStyle = leftGradient;
  ctx.fillRect(0, 0, gradientWidth, canvas.height);

  // Right gradient: from opaque at the right edge to transparent moving leftwards
  const rightGradient = ctx.createLinearGradient(
    canvas.width,
    0,
    canvas.width - gradientWidth,
    0,
  );
  rightGradient.addColorStop(0, opaque);
  rightGradient.addColorStop(1, transparent);
  ctx.fillStyle = rightGradient;
  ctx.fillRect(canvas.width - gradientWidth, 0, gradientWidth, canvas.height);

  // Top gradient: from opaque at the top to transparent downwards
  const topGradient = ctx.createLinearGradient(0, 0, 0, gradientWidth);
  topGradient.addColorStop(0, opaque);
  topGradient.addColorStop(1, transparent);
  ctx.fillStyle = topGradient;
  ctx.fillRect(0, 0, canvas.width, gradientWidth);

  // Bottom gradient: from opaque at the bottom to transparent upwards
  const bottomGradient = ctx.createLinearGradient(
    0,
    canvas.height,
    0,
    canvas.height - gradientWidth,
  );
  bottomGradient.addColorStop(0, opaque);
  bottomGradient.addColorStop(1, transparent);
  ctx.fillStyle = bottomGradient;
  ctx.fillRect(0, canvas.height - gradientWidth, canvas.width, gradientWidth);
}
requestAnimationFrame(update);
