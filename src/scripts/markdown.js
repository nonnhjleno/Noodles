document.querySelectorAll('.map')[0].children[0].width = document.querySelectorAll('.map') ? "100%": "";

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
  if (text.startsWith(":::note") && text.endsWith(":::")) {
    const div = document.createElement("div");
    div.classList.add("note");
    let cleanedText;
    if (text.slice(7, -3).startsWith(" warn")) {
      div.classList.add("warn");
      cleanedText = text.slice(12, -3);
    } else if (text.slice(7, -3).startsWith(" alert")) {
      div.classList.add("alert");
      cleanedText = text.slice(13, -3);
    } else {
      div.classList.add("info");
      cleanedText = text.slice(12, -3);
    }
    cleanedText = cleanedText.replace(/\n/g, "<br>");
    cleanedText = cleanedText.replace(/^<br>/, "");
    div.innerHTML = cleanedText;

    paragraph.replaceWith(div);
  }

  const links = paragraph.querySelectorAll("a");
  if(links[0] && links[0].href === links[0].innerText) {
    console.log(links[0]);
  }

});


