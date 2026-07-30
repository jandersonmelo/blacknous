import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

def replace_block(pattern, replacement, text):
    new_text, count = re.subn(pattern, replacement, text, flags=re.MULTILINE | re.DOTALL)
    if count == 0:
        print(f"Failed to replace pattern: {pattern[:50]}...")
    return new_text

# 1. html and body
css = replace_block(
r'''html \{
  scroll-behavior: smooth;
\}

body \{
  font-family: var\(--font-body\);
  background: var\(--bg-dark\);
  color: var\(--text-primary\);
  min-height: 100vh;
  overflow-x: hidden;
  position: relative;
\}''',
'''html {
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
}''', css)

# 2. app-container
css = replace_block(
r'''\.app-container \{
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
\}''',
'''.app-container {
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
}''', css)

# 3. start-screen
css = replace_block(
r'''\.start-screen \{
  text-align: center;
  animation: fadeInUp 0\.8s ease;
\}

\.start-screen \.logo-emoji \{
  font-size: 80px;
  display: block;
  margin-bottom: 20px;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow\(0 0 20px rgba\(124, 58, 237, 0\.5\)\);
\}''',
'''.start-screen {
  text-align: center;
  animation: fadeInUp 0.8s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.start-screen .logo-emoji {
  font-size: clamp(50px, 8vh, 80px);
  display: block;
  margin-bottom: 2vh;
  animation: bounce 2s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(124, 58, 237, 0.5));
}''', css)

css = replace_block(
r'''\.start-screen h1 \{
  font-family: var\(--font-display\);
  font-size: 3\.5rem;
  font-weight: 900;
  background: linear-gradient\(135deg, var\(--primary-light\), var\(--secondary-light\), var\(--accent-light\)\);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: -1px;
  line-height: 1\.1;
\}

\.start-screen \.subtitle \{
  font-size: 1\.15rem;
  color: var\(--text-secondary\);
  margin-bottom: 36px;
  line-height: 1\.6;
\}''',
'''.start-screen h1 {
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
}

.start-screen .subtitle {
  font-size: clamp(0.9rem, 2vh, 1.15rem);
  color: var(--text-secondary);
  margin-bottom: 3vh;
  line-height: 1.4;
}''', css)

# 4. topics-grid
css = replace_block(
r'''\.topics-grid \{
  display: grid;
  grid-template-columns: repeat\(auto-fit, minmax\(180px, 1fr\)\);
  gap: 12px;
  margin-bottom: 40px;
  text-align: left;
\}

\.topic-card \{
  background: var\(--bg-card\);
  border: 1px solid var\(--glass-border\);
  border-radius: var\(--radius-md\);
  padding: 14px 16px;
  font-size: 0\.85rem;
  color: var\(--text-secondary\);
  backdrop-filter: blur\(10px\);
  transition: var\(--transition-normal\);
  display: flex;
  align-items: center;
  gap: 8px;
\}''',
'''.topics-grid {
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
}

.topic-card {
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
}''', css)

# 5. btn-start
css = replace_block(
r'''\.btn-start \{
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 18px 52px;
  font-family: var\(--font-display\);
  font-size: 1\.3rem;
  font-weight: 700;
  color: white;
  background: linear-gradient\(135deg, var\(--primary\), var\(--secondary\)\);
  border: none;
  border-radius: var\(--radius-full\);
  cursor: pointer;
  transition: var\(--transition-normal\);
  box-shadow: 0 4px 25px rgba\(124, 58, 237, 0\.4\);
  overflow: hidden;
\}''',
'''.btn-start {
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
}''', css)

# 6. quiz-screen
css = replace_block(
r'''\.quiz-screen \{
  width: 100%;
  animation: fadeInUp 0\.5s ease;
\}''',
'''.quiz-screen {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  animation: fadeInUp 0.5s ease;
}''', css)

# 7. quiz-header and progress
css = replace_block(
r'''\.quiz-header \{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
  flex-wrap: wrap;
\}''',
'''.quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5vh;
  gap: 8px;
  flex-wrap: wrap;
  flex-shrink: 0;
}''', css)

css = replace_block(
r'''\.progress-container \{
  width: 100%;
  margin-bottom: 28px;
\}''',
'''.progress-container {
  width: 100%;
  margin-bottom: 1.5vh;
  flex-shrink: 0;
}''', css)

# 8. question card
css = replace_block(
r'''\.category-badge \{
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  font-size: 0\.85rem;
  font-weight: 600;
  color: var\(--primary-light\);
  background: rgba\(124, 58, 237, 0\.15\);
  border: 1px solid rgba\(124, 58, 237, 0\.3\);
  border-radius: var\(--radius-full\);
  margin-bottom: 18px;
\}

/\* Question Card \*/
\.question-card \{
  background: var\(--bg-card\);
  border: 1px solid var\(--glass-border\);
  border-radius: var\(--radius-xl\);
  padding: 36px;
  backdrop-filter: blur\(20px\);
  box-shadow: var\(--shadow-lg\);
  position: relative;
  overflow: hidden;
\}

\.question-card::before \{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient\(90deg, var\(--primary\), var\(--secondary\), var\(--accent\)\);
\}

\.question-text \{
  font-family: var\(--font-display\);
  font-size: 1\.25rem;
  font-weight: 600;
  line-height: 1\.6;
  margin-bottom: 28px;
  color: var\(--text-primary\);
\}''',
'''.category-badge {
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
}

/* Question Card */
.question-card {
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
}

.question-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
}

.question-text {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vh, 1.25rem);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1.5vh;
  color: var(--text-primary);
  flex-shrink: 0;
}''', css)

# 9. options list
css = replace_block(
r'''\.options-list \{
  display: flex;
  flex-direction: column;
  gap: 12px;
\}

\.option-btn \{
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 16px 20px;
  font-family: var\(--font-body\);
  font-size: 1rem;
  color: var\(--text-primary\);
  background: rgba\(255, 255, 255, 0\.04\);
  border: 2px solid rgba\(255, 255, 255, 0\.1\);
  border-radius: var\(--radius-lg\);
  cursor: pointer;
  transition: var\(--transition-normal\);
  text-align: left;
  position: relative;
  overflow: hidden;
\}''',
'''.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  justify-content: center;
}

.option-btn {
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
}''', css)

# 10. explanation & btn-next
css = replace_block(
r'''\.explanation \{
  margin-top: 20px;
  padding: 18px 22px;
  background: rgba\(124, 58, 237, 0\.08\);
  border: 1px solid rgba\(124, 58, 237, 0\.2\);
  border-radius: var\(--radius-md\);
  font-size: 0\.92rem;
  line-height: 1\.6;
  color: var\(--text-secondary\);
  animation: fadeInUp 0\.4s ease;
\}

\.explanation strong \{
  color: var\(--primary-light\);
\}

/\* Next Button \*/
\.btn-next \{
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 14px 36px;
  font-family: var\(--font-display\);
  font-size: 1\.05rem;
  font-weight: 600;
  color: white;
  background: linear-gradient\(135deg, var\(--primary\), var\(--primary-dark\)\);
  border: none;
  border-radius: var\(--radius-full\);
  cursor: pointer;
  transition: var\(--transition-normal\);
  box-shadow: 0 4px 20px rgba\(124, 58, 237, 0\.3\);
  animation: fadeInUp 0\.4s ease;
\}''',
'''.explanation {
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
}

.explanation strong {
  color: var(--primary-light);
}

/* Next Button */
.btn-next {
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
}''', css)

# 11. screen and results
css = replace_block(
r'''\.screen \{
  display: none;
\}

\.screen\.active \{
  display: block;
\}''',
'''.screen {
  display: none;
  width: 100%;
  height: 100%;
}

.screen.active {
  display: flex;
  justify-content: center;
  align-items: center;
}''', css)

# 12. results screen
css = replace_block(
r'''\.results-screen \{
  text-align: center;
  width: 100%;
  animation: fadeInUp 0\.8s ease;
\}

\.results-card \{
  background: var\(--bg-card\);
  border: 1px solid var\(--glass-border\);
  border-radius: var\(--radius-xl\);
  padding: 48px 36px;
  backdrop-filter: blur\(20px\);
  box-shadow: var\(--shadow-lg\);
  position: relative;
  overflow: hidden;
\}

\.results-card::before \{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient\(90deg, var\(--success\), var\(--primary\), var\(--accent\)\);
\}

\.results-emoji \{
  font-size: 80px;
  display: block;
  margin-bottom: 16px;
  animation: bounce 2s ease-in-out infinite;
\}

\.results-title \{
  font-family: var\(--font-display\);
  font-size: 2\.4rem;
  font-weight: 800;
  margin-bottom: 8px;
  background: linear-gradient\(135deg, var\(--primary-light\), var\(--secondary-light\)\);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
\}

\.results-subtitle \{
  color: var\(--text-secondary\);
  font-size: 1\.05rem;
  margin-bottom: 36px;
\}

/\* Score Circle \*/
\.score-circle-container \{
  display: flex;
  justify-content: center;
  margin-bottom: 36px;
\}

\.score-circle \{
  position: relative;
  width: 200px;
  height: 200px;
\}

\.score-circle svg \{
  transform: rotate\(-90deg\);
  width: 200px;
  height: 200px;
\}''',
'''.results-screen {
  text-align: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: fadeInUp 0.8s ease;
}

.results-card {
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
}

.results-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--success), var(--primary), var(--accent));
}

.results-emoji {
  font-size: clamp(40px, 6vh, 80px);
  display: block;
  margin-bottom: 1vh;
  animation: bounce 2s ease-in-out infinite;
}

.results-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vh, 2.4rem);
  font-weight: 800;
  margin-bottom: 0.5vh;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.results-subtitle {
  color: var(--text-secondary);
  font-size: clamp(0.9rem, 1.8vh, 1.05rem);
  margin-bottom: 2vh;
}

/* Score Circle */
.score-circle-container {
  display: flex;
  justify-content: center;
  margin-bottom: 2vh;
  flex-shrink: 0;
}

.score-circle {
  position: relative;
  width: clamp(100px, 18vh, 200px);
  height: clamp(100px, 18vh, 200px);
}

.score-circle svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}''', css)


css = replace_block(
r'''\.score-percentage \{
  font-family: var\(--font-display\);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
\}

\.score-label \{
  font-size: 0\.85rem;
  color: var\(--text-muted\);
  margin-top: 4px;
\}

/\* Stats Grid \*/
\.stats-grid \{
  display: grid;
  grid-template-columns: repeat\(3, 1fr\);
  gap: 16px;
  margin-bottom: 36px;
\}

\.stat-card \{
  background: rgba\(255, 255, 255, 0\.03\);
  border: 1px solid var\(--glass-border\);
  border-radius: var\(--radius-lg\);
  padding: 20px 14px;
  transition: var\(--transition-normal\);
\}

\.stat-card:hover \{
  transform: translateY\(-3px\);
  background: rgba\(255, 255, 255, 0\.06\);
\}

\.stat-emoji \{
  font-size: 2rem;
  margin-bottom: 8px;
\}

\.stat-value \{
  font-family: var\(--font-display\);
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 4px;
\}''',
'''.score-percentage {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 4vh, 3rem);
  font-weight: 900;
  line-height: 1;
}

.score-label {
  font-size: clamp(0.7rem, 1.5vh, 0.85rem);
  color: var(--text-muted);
  margin-top: 2px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 2vh;
  flex-shrink: 0;
}

.stat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: clamp(10px, 1.5vh, 20px) 10px;
  transition: var(--transition-normal);
}

.stat-card:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.06);
}

.stat-emoji {
  font-size: clamp(1.2rem, 3vh, 2rem);
  margin-bottom: 4px;
}

.stat-value {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3.5vh, 2rem);
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2px;
}''', css)


css = replace_block(
r'''/\* Category Stats \*/
\.category-stats \{
  margin-bottom: 36px;
  text-align: left;
\}

\.category-stats h3 \{
  font-family: var\(--font-display\);
  font-size: 1\.2rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var\(--text-primary\);
  text-align: center;
\}

\.category-stat-item \{
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba\(255, 255, 255, 0\.03\);
  border-radius: var\(--radius-md\);
  margin-bottom: 8px;
  transition: var\(--transition-normal\);
\}''',
'''/* Category Stats */
.category-stats {
  margin-bottom: 2vh;
  text-align: left;
  flex: 1;
  overflow-y: auto;
  min-height: 10vh;
}

.category-stats h3 {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2vh, 1.2rem);
  font-weight: 700;
  margin-bottom: 1vh;
  color: var(--text-primary);
  text-align: center;
}

.category-stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  margin-bottom: 6px;
  transition: var(--transition-normal);
}''', css)

# restart btn
css = replace_block(
r'''\.btn-restart \{
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  font-family: var\(--font-display\);
  font-size: 1\.2rem;
  font-weight: 700;
  color: white;
  background: linear-gradient\(135deg, var\(--primary\), var\(--secondary\)\);
  border: none;
  border-radius: var\(--radius-full\);
  cursor: pointer;
  transition: var\(--transition-normal\);
  box-shadow: 0 4px 25px rgba\(124, 58, 237, 0\.4\);
  overflow: hidden;
  position: relative;
\}''',
'''.btn-restart {
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
}''', css)

# Also need to fix `.screen` styles and media queries
# For mobile media query, we might not need all these changes if everything is already using clamp/vh, but let's clear up some properties that would break the height 100%

css = replace_block(
r'''@media \(max-width: 640px\) \{
  \.app-container \{
    padding: 16px;
  \}

  \.start-screen h1 \{
    font-size: 2\.2rem;
  \}

  \.topics-grid \{
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  \}

  \.topic-card \{
    padding: 10px 12px;
    font-size: 0\.78rem;
  \}

  \.question-card \{
    padding: 24px 18px;
    border-radius: var\(--radius-lg\);
  \}

  \.question-text \{
    font-size: 1\.05rem;
  \}

  \.quiz-header \{
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  \}

  \.stats-grid \{
    grid-template-columns: repeat\(3, 1fr\);
    gap: 10px;
  \}

  \.stat-value \{
    font-size: 1\.6rem;
  \}

  \.category-stat-bar \{
    width: 80px;
  \}

  \.results-title \{
    font-size: 1\.8rem;
  \}

  \.results-card \{
    padding: 32px 20px;
  \}
\}''',
'''@media (max-width: 640px) {
  .app-container {
    padding: 10px;
  }
  .quiz-header {
    gap: 6px;
  }
  .category-stat-bar {
    width: 60px;
  }
}''', css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(css)

print("Done updating style.css")
