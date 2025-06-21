document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Animations on Page Load ---
    const animateElements = () => {
        const bookCards = document.querySelectorAll('.book-card');
        const heroContent = document.querySelector('.hero h2');
        const filterButtons = document.querySelectorAll('.filters button');
        
        // Animate hero content
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(30px)';
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
        
        // Animate filter buttons
        filterButtons.forEach((button, index) => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            setTimeout(() => {
                button.style.transition = 'all 0.5s ease';
                button.style.opacity = '1';
                button.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
        
        // Animate book cards
        bookCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.95)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, 500 + (index * 100));
        });
    };

    // --- Favorite Button Toggle with Particles ---
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            button.classList.toggle('active');
            
            // Create particle effect
            if (button.classList.contains('active')) {
                createParticles(e.target, e.clientX, e.clientY);
            }
        });
    });

    const createParticles = (element, x, y) => {
        const particleCount = 8;
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: #f06292;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (360 / particleCount) * i;
            const velocity = 2 + Math.random() * 2;
            const radian = angle * (Math.PI / 180);
            const vx = Math.cos(radian) * velocity;
            const vy = Math.sin(radian) * velocity;
            
            let posX = rect.left + rect.width / 2;
            let posY = rect.top + rect.height / 2;
            let opacity = 1;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    };

    // --- View Switcher (Grid/List) with Smooth Transition ---
    const gridViewBtn = document.getElementById('grid-view-btn');
    const listViewBtn = document.getElementById('list-view-btn');
    const bookContainer = document.getElementById('book-container');

    if (gridViewBtn && listViewBtn && bookContainer) {
        gridViewBtn.addEventListener('click', () => {
            bookContainer.style.opacity = '0.7';
            setTimeout(() => {
                bookContainer.classList.remove('list-view');
                gridViewBtn.classList.add('active');
                listViewBtn.classList.remove('active');
                bookContainer.style.opacity = '1';
            }, 150);
        });

        listViewBtn.addEventListener('click', () => {
            bookContainer.style.opacity = '0.7';
            setTimeout(() => {
                bookContainer.classList.add('list-view');
                listViewBtn.classList.add('active');
                gridViewBtn.classList.remove('active');
                bookContainer.style.opacity = '1';
            }, 150);
        });
    }

    // --- Filter Tabs Active State with Ripple Effect ---
    const filterButtons = document.querySelectorAll('.date-filter button, .category-filter button');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(100, 255, 218, 0.5);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Remove 'active' from siblings in the same filter group
            const parent = e.target.parentElement;
            parent.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' to the clicked button
            e.target.classList.add('active');
        });
    });

    // --- Smooth Scroll for Internal Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Add Parallax Effect to Hero Section ---
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // --- Initialize animations ---
    animateElements();

    // --- Add Ripple Animation to CSS ---
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .book-container {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // --- AI Analysis Modal Functionality ---
    const modal = document.getElementById('analysis-modal');
    const startAnalysisBtn = document.querySelector('.start-analysis-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const analysisForm = document.getElementById('analysis-form');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const analyzeBtn = document.querySelector('.analyze-btn');
    const analyzingScreen = document.querySelector('.analyzing-screen');
    let currentStep = 1;

    // Open modal
    if (startAnalysisBtn) {
        startAnalysisBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            resetForm();
        }
    });

    // Form navigation
    function showStep(step) {
        formSteps.forEach(s => s.classList.remove('active'));
        formSteps[step - 1].classList.add('active');

        // Update navigation buttons
        prevBtn.style.display = step === 1 ? 'none' : 'flex';
        
        if (step === formSteps.length) {
            nextBtn.style.display = 'none';
            analyzeBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            analyzeBtn.style.display = 'none';
        }
    }

    // Next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    }

    // Previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    }

    // Validate current step
    function validateStep(step) {
        const activeStep = formSteps[step - 1];
        
        if (step === 1) {
            const checkedGenres = activeStep.querySelectorAll('input[name="genre"]:checked');
            if (checkedGenres.length === 0) {
                alert('少なくとも1つのジャンルを選択してください');
                return false;
            }
        } else if (step === 2) {
            const selectedPurpose = activeStep.querySelector('input[name="purpose"]:checked');
            if (!selectedPurpose) {
                alert('読書の目的を選択してください');
                return false;
            }
        } else if (step === 3) {
            const selectedPosition = activeStep.querySelector('input[name="position"]:checked');
            if (!selectedPosition) {
                alert('現在の立場を選択してください');
                return false;
            }
        }
        
        return true;
    }

    // Form submission
    if (analysisForm) {
        analysisForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                // Show analyzing screen
                analysisForm.style.display = 'none';
                analyzingScreen.style.display = 'block';
                
                // AI APIを呼び出す
                const formData = new FormData(analysisForm);
                const preferences = {
                    genres: Array.from(formData.getAll('genre')),
                    purpose: formData.get('purpose'),
                    position: formData.get('position')
                };
                
                // LocalStorageベースの推薦（バックエンドなし版）
                setTimeout(() => {
                    // ローカルで推薦を生成
                    const recommendations = generateLocalRecommendations(preferences);
                    
                    // LocalStorageに保存
                    localStorage.setItem('userPreferences', JSON.stringify(preferences));
                    localStorage.setItem('lastRecommendations', JSON.stringify(recommendations));
                    
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    analyzingScreen.style.display = 'none';
                    analysisForm.style.display = 'block';
                    resetForm();
                    
                    // 推薦結果を表示
                    updateBookDisplay(recommendations);
                    alert('分析が完了しました！あなたにぴったりの本が表示されています。');
                    document.querySelector('.new-releases').scrollIntoView({ behavior: 'smooth' });
                }, 2000);
            }
        });
    }

    // Reset form
    function resetForm() {
        currentStep = 1;
        showStep(currentStep);
        analysisForm.reset();
    }

    // ローカルで推薦を生成する関数
    function generateLocalRecommendations(preferences) {
        // 実際の書籍データ（2024年ベストセラー）
        const books = [
            {
                id: 1,
                title: 'AI 2041 人工知能が変える20年後の未来',
                author: 'カイフー・リー、チェン・チウファン',
                category: 'テクノロジー',
                amazon_url: 'https://www.amazon.co.jp/dp/4163914854',
                topics: ['knowledge', 'tech', 'business']
            },
            {
                id: 2,
                title: 'ジェイソン流お金の増やし方',
                author: '厚切りジェイソン',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4835646355',
                topics: ['skill-up', 'business', 'freelance']
            },
            {
                id: 3,
                title: '人は話し方が9割',
                author: '永松茂久',
                category: '自己啓発',
                amazon_url: 'https://www.amazon.co.jp/dp/4799108425',
                topics: ['skill-up', 'inspiration', 'manager']
            },
            {
                id: 4,
                title: 'ChatGPT最強の仕事術',
                author: '池田朋弘',
                category: 'テクノロジー',
                amazon_url: 'https://www.amazon.co.jp/dp/4866801956',
                topics: ['skill-up', 'tech', 'problem-solving']
            },
            {
                id: 5,
                title: 'スタンフォード式 最高の睡眠',
                author: '西野精治',
                category: 'サイエンス',
                amazon_url: 'https://www.amazon.co.jp/dp/4763136011',
                topics: ['knowledge', 'science', 'self-help']
            },
            {
                id: 6,
                title: 'メタバースとは何か',
                author: '岡嶋裕史',
                category: 'テクノロジー',
                amazon_url: 'https://www.amazon.co.jp/dp/4334045561',
                topics: ['knowledge', 'tech', 'business']
            },
            {
                id: 7,
                title: '1分で話せ',
                author: '伊藤羊一',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4797395230',
                topics: ['skill-up', 'business', 'manager']
            },
            {
                id: 8,
                title: 'FACTFULNESS',
                author: 'ハンス・ロスリング',
                category: 'サイエンス',
                amazon_url: 'https://www.amazon.co.jp/dp/4822289605',
                topics: ['knowledge', 'science', 'problem-solving']
            },
            {
                id: 9,
                title: 'リーダーの仮面',
                author: '安藤広大',
                category: '自己啓発',
                amazon_url: 'https://www.amazon.co.jp/dp/4478110514',
                topics: ['leadership', 'manager', 'skill-up']
            },
            {
                id: 10,
                title: '世界一やさしい「やりたいこと」の見つけ方',
                author: '八木仁平',
                category: '自己啓発',
                amazon_url: 'https://www.amazon.co.jp/dp/4046044357',
                topics: ['inspiration', 'self-help', 'student']
            },
            {
                id: 11,
                title: 'HARD THINGS',
                author: 'ベン・ホロウィッツ',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4822250857',
                topics: ['leadership', 'manager', 'executive'],
                description: '起業家が直面する困難な局面での意思決定法'
            },
            {
                id: 12,
                title: 'ゼロ秒思考',
                author: '赤羽雄二',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/447802099X',
                topics: ['skill-up', 'problem-solving', 'business'],
                description: 'メモ書きで思考と感情を整理する技術'
            },
            {
                id: 13,
                title: 'イシューからはじめよ',
                author: '安宅和人',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4862760856',
                topics: ['problem-solving', 'business', 'manager'],
                description: '生産性を劇的に高める問題設定の技術'
            },
            {
                id: 14,
                title: 'ビジョナリー・カンパニー',
                author: 'ジム・コリンズ',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4822740315',
                topics: ['leadership', 'executive', 'business'],
                description: '時代を超える偉大な企業の条件'
            },
            {
                id: 15,
                title: '7つの習慣',
                author: 'スティーブン・R・コヴィー',
                category: '自己啓発',
                amazon_url: 'https://www.amazon.co.jp/dp/4863940920',
                topics: ['leadership', 'skill-up', 'manager'],
                description: 'ビジネスと人生の成功原則'
            },
            {
                id: 16,
                title: 'HIGH OUTPUT MANAGEMENT',
                author: 'アンドリュー・S・グローブ',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4822255018',
                topics: ['manager', 'leadership', 'business'],
                description: 'インテル元CEOが教える経営管理の極意'
            },
            {
                id: 17,
                title: 'エッセンシャル思考',
                author: 'グレッグ・マキューン',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4761270438',
                topics: ['skill-up', 'problem-solving', 'business'],
                description: '最少の時間で成果を最大にする'
            },
            {
                id: 18,
                title: 'ティール組織',
                author: 'フレデリック・ラルー',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4862762263',
                topics: ['leadership', 'executive', 'manager'],
                description: '次世代型組織の出現'
            },
            {
                id: 19,
                title: 'OKR（オーケーアール）',
                author: 'クリスティーナ・ウォドキー',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4822255646',
                topics: ['business', 'manager', 'skill-up'],
                description: 'シリコンバレー式で戦略的に目標を達成する方法'
            },
            {
                id: 20,
                title: 'ストーリーとしての競争戦略',
                author: '楠木建',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4492532706',
                topics: ['business', 'executive', 'problem-solving'],
                description: '優れた戦略の条件'
            },
            {
                id: 21,
                title: 'プロフェッショナルの条件',
                author: 'P・F・ドラッカー',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4478300593',
                topics: ['skill-up', 'business', 'manager'],
                description: 'いかに成果をあげ、成長するか'
            },
            {
                id: 22,
                title: '人を動かす',
                author: 'D・カーネギー',
                category: '自己啓発',
                amazon_url: 'https://www.amazon.co.jp/dp/442210098X',
                topics: ['leadership', 'skill-up', 'manager'],
                description: '人間関係の原則'
            },
            {
                id: 23,
                title: 'GIVE & TAKE',
                author: 'アダム・グラント',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4837957463',
                topics: ['business', 'leadership', 'skill-up'],
                description: '「与える人」こそ成功する時代'
            },
            {
                id: 24,
                title: 'コンサル一年目が学ぶこと',
                author: '大石哲之',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4799315323',
                topics: ['skill-up', 'business', 'problem-solving'],
                description: 'コンサルタントが最初に学ぶスキル'
            },
            {
                id: 25,
                title: 'メモの魔力',
                author: '前田裕二',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4344034082',
                topics: ['skill-up', 'problem-solving', 'business'],
                description: 'アイデアを生み出し、夢を叶える思考術'
            },
            {
                id: 26,
                title: '論点思考',
                author: '内田和成',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4492556559',
                topics: ['problem-solving', 'business', 'manager'],
                description: 'BCG流 問題設定の技術'
            },
            {
                id: 27,
                title: '影響力の武器',
                author: 'ロバート・B・チャルディーニ',
                category: 'マーケティング',
                amazon_url: 'https://www.amazon.co.jp/dp/4414304229',
                topics: ['marketing', 'business', 'skill-up'],
                description: 'なぜ、人は動かされるのか'
            },
            {
                id: 28,
                title: 'ブルー・オーシャン戦略',
                author: 'W・チャン・キム、レネ・モボルニュ',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4478068119',
                topics: ['business', 'executive', 'problem-solving'],
                description: '競争のない世界を創造する'
            },
            {
                id: 29,
                title: 'マネジメント[エッセンシャル版]',
                author: 'P・F・ドラッカー',
                category: 'ビジネス・経済',
                amazon_url: 'https://www.amazon.co.jp/dp/4478410232',
                topics: ['manager', 'leadership', 'business'],
                description: 'マネジメントの基本と原則'
            },
            {
                id: 30,
                title: 'アイデアのつくり方',
                author: 'ジェームス W.ヤング',
                category: 'マーケティング',
                amazon_url: 'https://www.amazon.co.jp/dp/4484881047',
                topics: ['problem-solving', 'marketing', 'skill-up'],
                description: '60年間売れ続ける創造性の教科書'
            }
        ];
        
        // スコアリングして推薦
        const scoredBooks = books.map(book => {
            let score = 0;
            
            // ジャンルマッチング
            const categoryMap = {
                'business': 'ビジネス・経済',
                'tech': 'テクノロジー',
                'self-help': '自己啓発',
                'science': 'サイエンス',
                'marketing': 'マーケティング'
            };
            
            preferences.genres.forEach(genre => {
                if (categoryMap[genre] === book.category) {
                    score += 0.5;
                }
            });
            
            // 目的マッチング
            if (book.topics.includes(preferences.purpose)) {
                score += 0.3;
            }
            
            // ポジションマッチング
            if (book.topics.includes(preferences.position)) {
                score += 0.2;
            }
            
            // 理由を生成
            const reasons = [];
            if (preferences.genres.some(g => categoryMap[g] === book.category)) {
                reasons.push(`あなたが選択した「${book.category}」ジャンルの本です`);
            }
            
            const purposeReasons = {
                'skill-up': 'スキルアップに最適な実践的な内容',
                'knowledge': '知識を深めるための体系的な解説',
                'problem-solving': '具体的な問題解決のヒントが満載',
                'inspiration': '新しい視点とインスピレーションを提供'
            };
            
            if (purposeReasons[preferences.purpose]) {
                reasons.push(purposeReasons[preferences.purpose]);
            }
            
            return {
                ...book,
                score: score,
                reason: reasons.join('。') + '。'
            };
        });
        
        // スコアでソートして上位を返す
        return scoredBooks
            .filter(book => book.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);
    }

    // 推薦結果で書籍表示を更新
    function updateBookDisplay(recommendations) {
        const bookContainer = document.getElementById('book-container');
        if (!bookContainer || !recommendations.length) return;
        
        // 既存の書籍カードをクリア
        bookContainer.innerHTML = '';
        
        // 推薦された書籍を表示
        recommendations.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <div class="book-cover">
                    <img src="book-cover.webp" alt="${book.title}">
                </div>
                <div class="book-info">
                    <h4 class="book-title">${book.title}</h4>
                    <p class="book-author">${book.author}</p>
                    <span class="book-category">${book.category}</span>
                    <div class="ai-reason">AIがあなたにおすすめする理由：<br>${book.reason}</div>
                    <a href="${book.amazon_url}" target="_blank" class="amazon-btn">
                        <i class="fa-brands fa-amazon"></i> Amazonで購入
                    </a>
                </div>
                <button class="favorite-btn" aria-label="お気に入りに追加"><i class="fa-regular fa-heart"></i></button>
            `;
            bookContainer.appendChild(bookCard);
        });
        
        // お気に入りボタンのイベントを再設定
        const newFavoriteButtons = bookContainer.querySelectorAll('.favorite-btn');
        newFavoriteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                button.classList.toggle('active');
                if (button.classList.contains('active')) {
                    createParticles(e.target, e.clientX, e.clientY);
                }
            });
        });
    }

});
