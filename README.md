# Appium Test Project

このプロジェクトは、Appium を使用して Android デバイス上で Google 検索を自動化するサンプルプロジェクトです。

## 必要条件

- Node.js (バージョン 18.12.1 以上)が PC にインストールされていること。
- Android デバイス (バージョン 12 以上)が用意されていること。

## インストール

プロジェクトの依存関係をインストールするには、以下のコマンドを実行します。

```
npm install
```

## 環境構築

Appium の環境構築手順は、[Appium 公式ドキュメント](https://appium.io/docs/en/latest/quickstart/)に基づいています。

### 1. Appium のインストール

以下のコマンドを使用して Appium をインストールします。

```bash
npm install -g appium
```

### 2. UiAutomator2 ドライバーのインストール

UiAutomator2 ドライバーとその依存関係をインストールします。

```bash
appium driver install uiautomator2
```

以下のコマンドを実行して、Appium のモバイル専用ドライバー（UiAutomator2、XCUITest（macOS のみ）、Espresso）をインストールします。

```bash
appium setup
```

### 3. Android SDK のセットアップ

Android SDK のセットアップには、Android Studio を使用するのが最も簡単です。以下の手順に従ってください。

1. [Android Studio](https://developer.android.com/studio)をダウンロードしてインストールします。
2. Android Studio を開き、SDK Manager に移動します（`Settings -> Appearance & Behavior -> System Settings -> Android SDK`）。
3. 以下の項目をダウンロードします：
   - Android SDK Platform（自動化したい Android プラットフォームを選択、例：API レベル 30）
   - Android SDK Platform-Tools
4. `ANDROID_HOME` 環境変数を Android SDK がインストールされているディレクトリに設定します。このディレクトリには `platform-tools` などのディレクトリが含まれます。

   - Windows:

     1. 環境変数設定画面を開きます（`システムのプロパティ -> 環境変数`）。
     2. `新規` ボタンをクリックし、新しいシステム変数を追加します。
        - 変数名: `ANDROID_HOME`
        - 変数値: `C:\Users\<ユーザー名>\AppData\Local\Android\Sdk`（Android SDK のインストールパス）
     3. `Path` 変数を選択し、`編集` ボタンをクリックします。
     4. `新規` ボタンをクリックし、以下のパスを追加します。
        - `%ANDROID_HOME%\platform-tools`
        - `%ANDROID_HOME%\tools`
     5. すべてのダイアログを `OK` で閉じて設定を保存します。

   - macOS/Linux:
     1. ターミナルを開き、ホームディレクトリに移動します。
     2. `.bashrc` または `.zshrc` ファイルを開きます（使用しているシェルに応じて）。
     3. 以下の行を追加します。
        ```bash
        export ANDROID_HOME=$HOME/Library/Android/sdk
        export PATH=$PATH:$ANDROID_HOME/platform-tools
        export PATH=$PATH:$ANDROID_HOME/tools
        ```
     4. ファイルを保存して閉じます。
     5. 以下のコマンドを実行して設定を反映させます。
        ```bash
        source ~/.bashrc  # または source ~/.zshrc
        ```

   環境構築後、使用していたターミナル、起動していたターミナルがあれば、再起動し、以下のコマンドで環境変数が正しく反映されているかを確認してください。

   ```bash
   echo $ANDROID_HOME
   ```

### 4. Java JDK のインストール

Java JDK をインストールします。最新の Android API レベルには JDK 9 が必要ですが、通常は JDK 8 で十分です。以下の手順に従ってください。

1. [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) または [Adoptium](https://adoptium.net/) から JDK をダウンロードしてインストールします。
2. `JAVA_HOME` 環境変数を JDK のホームディレクトリに設定します。このディレクトリには `bin`、`include` などのディレクトリが含まれます。

   - Windows:

     1. コマンドプロンプトを開き、以下のコマンドを実行して JDK のインストールパスを確認します。
        ```cmd
        where java
        ```
     2. 確認したパスを基に、環境変数設定画面を開きます（`システムのプロパティ -> 環境変数`）。
     3. `新規` ボタンをクリックし、新しいシステム変数を追加します。
        - 変数名: `JAVA_HOME`
        - 変数値: `C:\Program Files\Java\jdk<バージョン>` または `C:\Program Files\Eclipse Adoptium\jdk-<バージョン>`（確認した JDK のインストールパス）
     4. `Path` 変数を選択し、`編集` ボタンをクリックします。
     5. `新規` ボタンをクリックし、以下のパスを追加します。
        - `%JAVA_HOME%\bin`
     6. すべてのダイアログを `OK` で閉じて設定を保存します。

   - macOS/Linux:
     1. ターミナルを開き、以下のコマンドを実行して JDK のインストールパスを確認します。
        ```bash
        /usr/libexec/java_home -V
        ```
     2. 確認したパスを使用して、`.bashrc` または `.zshrc` ファイルを開きます（使用しているシェルに応じて）。
     3. 以下の行を追加します。
        ```bash
        export JAVA_HOME=<確認したパス>
        export PATH=$PATH:$JAVA_HOME/bin
        ```
     4. ファイルを保存して閉じます。
     5. 以下のコマンドを実行して設定を反映させます。
        ```bash
        source ~/.bashrc  # または source ~/.zshrc
        ```

   環境構築後、使用していたターミナル、起動していたターミナルがあれば、再起動し、以下のコマンドで環境変数が正しく反映されているかを確認してください。

   ```bash
   echo $JAVA_HOME
   ```

### 5. デバイスの準備

#### エミュレータを使用する場合

1. Android Studio を使用して Android Virtual Device (AVD) を作成し、起動します。
2. 必要な API レベルのシステムイメージをダウンロードします。

#### 実機を使用する場合

1. デバイスを開発用に設定し、USB デバッグを有効にします。
2. エミュレータまたは実機が接続されていることを確認するために、以下のコマンドを実行します：
   ```bash
   adb devices
   ```

### 7. Appium Doctor での検証

Appium Doctor を使用して、すべての前提条件が正しく設定されているかを検証します。

    ```
    appium driver doctor uiautomator2
    ```

# 使用方法

1. Appium サーバーを起動します。以下のコマンドを使用します。

   ```bash
   appium
   ```

2. `test.js` ファイルを実行して、テストを実行します。

   ```bash
   node test.js
   ```

## 注意事項

- `test.js` ファイル内の `platformVersion` と `deviceName` を実際のデバイス情報に置き換えてください。
- `chromedriver` のパスが正しいことを確認してください。
