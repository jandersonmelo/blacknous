const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf8');

function replaceBlock(pattern, replacement, text) {
    const regex = new RegExp(pattern, 'g');
    const newText = text.replace(regex, replacement);
    if (newText === text) {
        console.log(`Failed to replace pattern: ${pattern.substring(0, 50)}...`);
    }
    return newText;
}

// Helper to escape regex special characters for literal strings except for places we want regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

// 1. html and body
css = css.replace(/html \{\s*scroll-behavior: smooth;\s*\}\s*body \{[\s\S]*?\}/,
`html {
  scroll-behavior: smooth;
  height: 100%;
  overflow: hidden;
}

body {
  font-family: var(--font-body);
  background: var(--bg-dark);
  color: var(--text-primary);
  height: 100%;
  height: 100dvh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}`);

// 2. app-container
css = css.replace(/\.app-container \{[\s\S]*?justify-content: center;\s*\}/,
`.app-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  height: 100%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}`);

// 3. start-screen
css = css.replace(/\.start-screen \{\s*text-align: center;\s*animation: fadeInUp 0\.8s ease;\s*\}/,
`.start-screen {
  text-align: center;
  animation: fadeInUp 0.8s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}`);

css = css.replace(/\.start-screen \.logo-emoji \{[\s\S]*?filter: drop-shadow\(.*?\);\s*\}/,
`.start-screen .logo-emoji {
  font-size: clamp(50px, 8vh, 80px);
  display: block;
  margin-bottom: 2vh;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.5));
}`);

css = css.replace(/\.start-screen h1 \{[\s\S]*?line-height: 1\.1;\s*\}/,
`.start-screen h1 {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vh, 3.5rem);
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light), var(--accent-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1vh;
  letter-spacing: -1px;
  line-height: 1.1;
}`);

css = css.replace(/\.start-screen \.subtitle \{[\s\S]*?line-height: 1\.6;\s*\}/,
`.start-screen .subtitle {
  font-size: clamp(0.9rem, 2vh, 1.15rem);
  color: var(--text-secondary);
  margin-bottom: 3vh;
  line-height: 1.4;
}`);

// 4. topics-grid
css = css.replace(/\.topics-grid \{[\s\S]*?text-align: left;\s*\}/,
`.topics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 3vh;
  text-align: left;
  width: 100%;
  max-width: 500px;
}

@media (min-width: 600px) {
  .topics-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`);

css = css.replace(/\.topic-card \{[\s\S]*?gap: 8px;\s*\}/,
`.topic-card {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  padding: 10px;
  font-size: clamp(0.75rem, 1.5vh, 0.85rem);
  color: var(--text-secondary);
  backdrop-filter: blur(10px);
  transition: var(--transition-normal);
  display: flex;
  align-items: center;
  gap: 6px;
}`);

// 5. btn-start
css = css.replace(/\.btn-start \{[\s\S]*?overflow: hidden;\s*\}/,
`.btn-start {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: clamp(12px, 2vh, 18px) clamp(30px, 5vh, 52px);
  font-family: var(--font-display);
  font-size: clamp(1.1rem, 2.5vh, 1.3rem);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: 0 4px 25px rgba(124, 58, 237, 0.4);
  overflow: hidden;
}`);

// 6. quiz-screen
css = css.replace(/\.quiz-screen \{\s*width: 100%;\s*animation: fadeInUp 0\.5s ease;\s*\}/,
`.quiz-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.5s ease;
}`);

// 7. quiz-header and progress
css = css.replace(/\.quiz-header \{[\s\S]*?flex-wrap: wrap;\s*\}/,
`.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5vh;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}`);

css = css.replace(/\.progress-container \{\s*width: 100%;\s*margin-bottom: 28px;\s*\}/,
`.progress-container {
  width: 100%;
  margin-bottom: 1.5vh;
  flex-shrink: 0;
}`);

// 8. question card
css = css.replace(/\.category-badge \{[\s\S]*?margin-bottom: 18px;\s*\}/,
`.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--primary-light);
  background: rgba(124, 58, 237, 0.15);
  border: 1px solid rgba(124, 58, 237, 0.3);
  border-radius: var(--radius-full);
  margin-bottom: 1vh;
  flex-shrink: 0;
}`);

css = css.replace(/\.question-card \{\s*background: var\(--bg-card\);[\s\S]*?overflow: hidden;\s*\}/,
`.question-card {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: clamp(16px, 2.5vh, 30px);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}`);

css = css.replace(/\.question-text \{[\s\S]*?color: var\(--text-primary\);\s*\}/,
`.question-text {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vh, 1.25rem);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1.5vh;
  color: var(--text-primary);
  flex-shrink: 0;
}`);

// 9. options list
css = css.replace(/\.options-list \{\s*display: flex;\s*flex-direction: column;\s*gap: 12px;\s*\}/,
`.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
}`);

css = css.replace(/\.option-btn \{\s*display: flex;[\s\S]*?overflow: hidden;\s*\}/,
`.option-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: clamp(8px, 1.5vh, 16px) 16px;
  font-family: var(--font-body);
  font-size: clamp(0.85rem, 2vh, 1rem);
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.04);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: var(--transition-normal);
  text-align: left;
  position: relative;
  overflow: hidden;
}`);

// 10. explanation & btn-next
css = css.replace(/\.explanation \{[\s\S]*?animation: fadeInUp 0\.4s ease;\s*\}/,
`.explanation {
  margin-top: 1vh;
  padding: 10px 14px;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.2);
  border-radius: var(--radius-md);
  font-size: clamp(0.8rem, 1.8vh, 0.92rem);
  line-height: 1.4;
  color: var(--text-secondary);
  animation: fadeInUp 0.4s ease;
  overflow-y: auto;
  max-height: 12vh;
}`);

css = css.replace(/\.btn-next \{[\s\S]*?animation: fadeInUp 0\.4s ease;\s*\}/,
`.btn-next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1vh;
  padding: clamp(10px, 1.5vh, 14px) 24px;
  font-family: var(--font-display);
  font-size: clamp(0.9rem, 2vh, 1.05rem);
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
  animation: fadeInUp 0.4s ease;
  flex-shrink: 0;
}`);

// 11. screen and results
css = css.replace(/\.screen \{\s*display: none;\s*\}\s*\.screen\.active \{\s*display: block;\s*\}/,
`.screen {
  display: none;
  width: 100%;
  height: 100%;
}

.screen.active {
  display: flex;
  justify-content: center;
  align-items: center;
}`);

// 12. results screen
css = css.replace(/\.results-screen \{\s*text-align: center;\s*width: 100%;\s*animation: fadeInUp 0\.8s ease;\s*\}/,
`.results-screen {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInUp 0.8s ease;
}`);

css = css.replace(/\.results-card \{\s*background: var\(--bg-card\);[\s\S]*?overflow: hidden;\s*\}/,
`.results-card {
  background: var(--bg-card);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: clamp(20px, 3vh, 32px) clamp(16px, 2.5vh, 24px);
  backdrop-filter: blur(20px);
  box-shadow: var(--shadow-lg);
  position: relative;
  overflow: hidden;
  max-height: 100%;
  display: flex;
  flex-direction: column;
}`);

css = css.replace(/\.results-emoji \{\s*font-size: 80px;[\s\S]*?infinite;\s*\}/,
`.results-emoji {
  font-size: clamp(40px, 6vh, 80px);
  display: block;
  margin-bottom: 1vh;
  animation: bounce 2s ease-in-out infinite;
}`);

css = css.replace(/\.results-title \{[\s\S]*?background-clip: text;\s*\}/,
`.results-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vh, 2.4rem);
  font-weight: 800;
  margin-bottom: 0.5vh;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}`);

css = css.replace(/\.results-subtitle \{[\s\S]*?margin-bottom: 36px;\s*\}/,
`.results-subtitle {
  color: var(--text-secondary);
  font-size: clamp(0.9rem, 1.8vh, 1.05rem);
  margin-bottom: 2vh;
}`);

css = css.replace(/\.score-circle-container \{[\s\S]*?margin-bottom: 36px;\s*\}/,
`.score-circle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
  flex-shrink: 0;
}`);

css = css.replace(/\.score-circle \{\s*position: relative;\s*width: 200px;\s*height: 200px;\s*\}/,
`.score-circle {
  position: relative;
  width: clamp(100px, 18vh, 200px);
  height: clamp(100px, 18vh, 200px);
}`);

css = css.replace(/\.score-circle svg \{\s*transform: rotate\(-90deg\);\s*width: 200px;\s*height: 200px;\s*\}/,
`.score-circle svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}`);

css = css.replace(/\.score-percentage \{[\s\S]*?line-height: 1;\s*\}/,
`.score-percentage {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vh, 3rem);
  font-weight: 900;
  line-height: 1;
}`);

css = css.replace(/\.score-label \{[\s\S]*?margin-top: 4px;\s*\}/,
`.score-label {
  font-size: clamp(0.7rem, 1.5vh, 0.85rem);
  color: var(--text-muted);
  margin-top: 2px;
}`);

css = css.replace(/\.stats-grid \{[\s\S]*?margin-bottom: 36px;\s*\}/,
`.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 2vh;
  flex-shrink: 0;
}`);

css = css.replace(/\.stat-card \{[\s\S]*?transition: var\(--transition-normal\);\s*\}/,
`.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: clamp(10px, 1.5vh, 20px) 10px;
  transition: var(--transition-normal);
}`);

css = css.replace(/\.stat-emoji \{\s*font-size: 2rem;\s*margin-bottom: 8px;\s*\}/,
`.stat-emoji {
  font-size: clamp(1.2rem, 3vh, 2rem);
  margin-bottom: 4px;
}`);

css = css.replace(/\.stat-value \{[\s\S]*?margin-bottom: 4px;\s*\}/,
`.stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.5vh, 2rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2px;
}`);

css = css.replace(/\.category-stats \{[\s\S]*?text-align: left;\s*\}/,
`.category-stats {
  margin-bottom: 2vh;
  text-align: left;
  flex: 1;
  overflow-y: auto;
  min-height: 10vh;
}`);

css = css.replace(/\.category-stats h3 \{[\s\S]*?text-align: center;\s*\}/,
`.category-stats h3 {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vh, 1.2rem);
  font-weight: 700;
  margin-bottom: 1vh;
  color: var(--text-primary);
  text-align: center;
}`);

css = css.replace(/\.category-stat-item \{[\s\S]*?transition: var\(--transition-normal\);\s*\}/,
`.category-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  margin-bottom: 6px;
  transition: var(--transition-normal);
}`);

css = css.replace(/\.btn-restart \{[\s\S]*?overflow: hidden;\s*position: relative;\s*\}/,
`.btn-restart {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: clamp(12px, 2vh, 18px) 36px;
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vh, 1.2rem);
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: var(--transition-normal);
  box-shadow: 0 4px 25px rgba(124, 58, 237, 0.4);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}`);

css = css.replace(/@media \(max-width: 640px\) \{[\s\S]*?\}/,
`@media (max-width: 640px) {
  .app-container {
    padding: 10px;
  }
  .quiz-header {
    gap: 6px;
  }
  .category-stat-bar {
    width: 60px;
  }
}`);

fs.writeFileSync('style.css', css);
console.log("Done updating style.css");
