// 動畫 1 (超人) 的變數
let spritesheet1;
let frames1 = [];
let currentFrame1 = 0;
const totalFrames1 = 9; // 總共有 9 張圖片
const frameWidth1 = 544 / totalFrames1; // 每張圖片的寬度
const frameHeight1 = 103; // 每張圖片的高度

// 動畫 2 (白毛) 的變數
let spritesheet2;
let frames2 = [];
let currentFrame2 = 0;
const totalFrames2 = 11; // 總共有 11 張圖片
const frameWidth2 = 611 / totalFrames2; // 每張圖片的寬度
const frameHeight2 = 55; // 每張圖片的高度

// 音樂與振幅相關變數
let song;
let amp;
let hasStarted = false; // 用於追蹤音樂是否已開始
let isAnimating = false; // 新增：用於控制動畫播放/暫停

// 在 setup() 之前預先載入圖片資源
function preload() {
  // 載入位於 '1' 資料夾中的圖片精靈
  spritesheet1 = loadImage('1/all_1超人.png');
  // 載入位於 '2' 資料夾中的圖片精靈
  spritesheet2 = loadImage('2/all_2白毛.png');

  // 載入您的音樂檔案
  // *** 請將 'assets/your_music.mp3' 替換成您自己的音樂檔案路徑 ***
  // 這裡的路徑需要是實際的檔案路徑。假設您的檔案在 assets 資料夾中。
  song = loadSound('assets/Virtual Riot - Energy Drink.mp3');
}

function setup() {
  // 建立一個佔滿整個視窗的畫布
  createCanvas(windowWidth, windowHeight);
  
  // 建立一個 Amplitude 物件來分析音量
  amp = new p5.Amplitude();

  // 從 spritesheet1 中切割出每一幀動畫
  for (let i = 0; i < totalFrames1; i++) {
    let x = i * frameWidth1;
    // 使用 get() 方法從 spritesheet 中提取單一幀
    let frame = spritesheet1.get(x, 0, frameWidth1, frameHeight1);
    frames1.push(frame);
  }

  // 從 spritesheet2 中切割出每一幀動畫
  for (let i = 0; i < totalFrames2; i++) {
    let x = i * frameWidth2;
    // 使用 get() 方法從 spritesheet 中提取單一幀
    let frame = spritesheet2.get(x, 0, frameWidth2, frameHeight2);
    frames2.push(frame);
  }

  // 設定文字樣式
  textAlign(CENTER, CENTER);
  textSize(24);
}

// 瀏覽器需要使用者互動才能播放聲音
function mousePressed() {
  // 如果音樂尚未開始，點擊滑鼠來循環播放音樂
  if (!hasStarted) {
    song.loop(); // 循環播放音樂
    hasStarted = true; // 標記音樂已開始
    isAnimating = true; // 同時開始播放動畫
  } else {
    // 如果音樂已在播放，則同時切換動畫和音樂的播放/暫停狀態
    if (song.isPlaying()) {
      song.pause(); // 暫停音樂
      isAnimating = false; // 暫停動畫
    } else {
      song.play(); // 繼續播放音樂
      isAnimating = true; // 繼續播放動畫
    }
  }
}

function draw() {
  // 設定背景顏色
  background('#e4c1f9');

  if (!hasStarted) {
    // 如果音樂尚未開始，顯示提示文字
    fill(255);
    text('點擊畫面任何地方以開始', windowWidth / 2, windowHeight / 2);
  } else {
    // imageMode(CENTER) 讓圖片的定位點在圖片中心
    imageMode(CENTER);

    // 取得目前的音量 (振幅)，範圍在 0 到 1 之間
    let level = amp.getLevel();
    
    // 將音量大小映射到動畫速度
    // 音量為 0 時，每 30 幀更新一次 (最慢)
    // 音量為 1 時，每 2 幀更新一次 (最快)
    let animationSpeed = map(level, 0, 1, 30, 2);

    // 將第一個動畫繪製在畫布中央偏左的位置
    image(frames1[currentFrame1], windowWidth / 2 - frameWidth1 / 2, windowHeight / 2);
    // 將第二個動畫繪製在畫布中央偏右的位置
    image(frames2[currentFrame2], windowWidth / 2 + frameWidth2 / 2, windowHeight / 2);

    // 使用 frameCount 和映射後的速度來控制動畫幀的更新
    // 只有在 isAnimating 為 true 時才更新動畫幀
    if (isAnimating && frameCount % floor(animationSpeed) === 0) {
        currentFrame1 = (currentFrame1 + 1) % totalFrames1;
        currentFrame2 = (currentFrame2 + 1) % totalFrames2;
    }
  }
}
