const markdownjs = () => {
  if (document.querySelector("#map")) {
    if (document.querySelector("#map").querySelector("iframe")) {
      document.querySelector("#map").querySelector("iframe").style.width = "100%";
    }
  }

  const blockquotes = document.querySelectorAll("blockquote");
  blockquotes.forEach((blockquote) => {
    const paragraphs = blockquote.querySelectorAll("p");
    paragraphs.forEach((p) => {
      const text = p.textContent;
      if (
        text.startsWith("引用元:") ||
        text.startsWith("出典:") ||
        text.startsWith("参考文献:")
      ) {
        p.classList.add("right-aligned");
      }
    });
  });

  const paragraphs = document.querySelectorAll("p");
  paragraphs.forEach((paragraph) => {
    const text = paragraph.textContent;

    // :::note で始まり ::: で終わる場合に処理
    if (text.startsWith(":::note") && text.endsWith(":::")) {
      const div = document.createElement("div");
      div.classList.add("note");
      let cleanedText;
      let iconSrc = "/images/"; // アイコンの画像パスを格納

      // クラスとアイコン画像の決定
      if (text.slice(7, -3).startsWith(" warn")) {
        div.classList.add("warn");
        cleanedText = text.slice(12, -3);
        iconSrc += "warn.png"; // warn用の画像
      } else if (text.slice(7, -3).startsWith(" alert")) {
        div.classList.add("alert");
        cleanedText = text.slice(13, -3);
        iconSrc += "alert.png"; // alert用の画像
      } else {
        div.classList.add("info");
        cleanedText = text.slice(12, -3);
        iconSrc += "info.png"; // info用の画像
      }

      // 改行をHTMLに変換
      cleanedText = cleanedText.replace(/\n/g, "<br>");
      cleanedText = cleanedText.replace(/^<br>/, "");
      div.innerHTML = cleanedText;

      // アイコン画像を左上に追加
      const icon = document.createElement("img");
      icon.src = iconSrc;
      icon.alt = div.classList.contains("warn")
        ? "Warning"
        : div.classList.contains("alert")
          ? "Alert"
          : "Info";
      icon.style.position = "absolute";
      icon.style.top = "8px";
      icon.style.left = "8px";
      icon.style.width = "32px";
      icon.style.height = "32px";

      // divを相対位置に設定して、アイコンを配置可能に
      div.style.position = "relative";
      div.style.paddingLeft = "48px"; // 左上のアイコン分のスペースを確保

      // divにアイコンを追加
      div.appendChild(icon);

      // 元の<p>タグを置き換え
      paragraph.replaceWith(div);
    }

    const links = paragraph.querySelectorAll("a");
    if (links[0] && links[0].href === links[0].innerText) {
      console.log(links[0]);
    }
  });
}

markdownjs();

import { marked } from "https://cdn.jsdelivr.net/npm/marked@4.3.0/lib/marked.esm.js";

document.getElementById("readFile").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const markdown = document.getElementById("markdown");

  if (fileInput.files.length === 0) {
    alert("ファイルを選択してください");
    return;
  }

  const file = fileInput.files[0];

  if (file.type !== "text/markdown" && !file.name.endsWith(".md")) {
    alert("Markdownファイルを選択してください");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const markdownContent = e.target.result;

    // MarkdownをHTMLに変換
    const htmlContent = marked.parse(markdownContent);

    // 安全にレンダリングするためinnerHTMLを使用
    markdown.innerHTML = htmlContent;
    sessionStorage.setItem('contentData', markdownContent);
    console.log(markdownContent);
  };

  reader.readAsText(file);

  setTimeout(markdownjs,1000);
});