window.addEventListener('load', ()=>{
    // リスト
  class Copy {
      constructor(txt) {
          this.txt = txt
      }

      copyTxt() {
          navigator.clipboard.writeText(this.txt);
      } 
    }
    const files = Array.from(document.querySelectorAll(".file"));
    const dirs = Array.from(document.querySelectorAll(".dir"));
    const file_name_view = document.getElementById('file_name_view');
    const imgbox = document.getElementById('imgbox');

    files.forEach(function(e){
      e.addEventListener('click', function(){
        (async () => {
          const url = `/blogs/get_image${this.dataset.file}`;

          // fetchを使用してテキストファイルを取得
          fetch(url, {method: 'GET'})
            .then(response => {
              console.log('Response status:', response.status);
              // レスポンスが正常かどうか確認
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              // テキストとしてレスポンスを取得
              return response.json();
            })
            .then(data => {
              // 取得したテキストデータをコンソールに出力
              const target = document.getElementById('imgbox');
              target.innerHTML = `<img src="data:image/jpeg;base64,${data.image}" alt="">`
            })
            .catch(error => {
              // エラーをキャッチしてコンソールに出力
              console.error('Fetch error:', error);
            });
        })()
        var copy = new Copy(this.dataset.file);
        copy.copyTxt()
        event.stopPropagation();
      });
    });

    dirs.forEach(function(e){
      e.addEventListener('click', function(){
        this.classList.toggle("close");
      });
    });
    const h1_btn = document.getElementById("h1_btn");
    const h2_btn = document.getElementById("h2_btn");
    const h3_btn = document.getElementById("h3_btn");

    h1_btn.addEventListener("click", () => {
      const editor = document.getElementById("editor");
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const h1 = document.createElement("h1");
        h1.textContent = "タイトル１";
        editor.appendChild(h1);
      }
    });

    h2_btn.addEventListener("click", () => {
      const editor = document.getElementById("editor");
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const h2 = document.createElement("h2");
        h2.textContent = "タイトル２";
        editor.appendChild(h2);
      }
    });

    h3_btn.addEventListener("click", () => {
      const editor = document.getElementById("editor");
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        const h3 = document.createElement("h3");
        h3.textContent = "タイトル３";
        editor.appendChild(h3);
      }
    });


    const editor = document.getElementById("editor");

    editor.addEventListener("keydown", (event) => {
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;

        // 現在のカーソルがテキストノードの場合は親要素を取得
        let parentElement = currentNode.nodeType === Node.TEXT_NODE 
          ? currentNode.parentElement 
          : currentNode;

        // <li>タグ内の処理
        if (parentElement.tagName === "LI") {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // デフォルトのEnter動作をキャンセル

            // 新しい<li>タグを作成して挿入
            const newLi = document.createElement("li");
            newLi.innerHTML = "<br>"; // 空の<li>タグ
            parentElement.parentNode.insertBefore(newLi, parentElement.nextSibling);

            // カーソルを新しい<li>タグ内に移動
            const newRange = document.createRange();
            newRange.setStart(newLi, 0);
            newRange.setEnd(newLi, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);

          } else if (event.key === "Enter" && event.shiftKey) {
            event.preventDefault(); // デフォルトのShift + Enter動作をキャンセル

            // 親の<ul>タグを取得
            const ulElement = parentElement.parentNode;

            // 新しい<p>タグを作成して挿入
            const newP = document.createElement("p");
            newP.innerHTML = "段落"; // 初期の段落テキスト
            if (ulElement.nextSibling) {
              ulElement.parentNode.insertBefore(newP, ulElement.nextSibling);
            } else {
              ulElement.parentNode.appendChild(newP);
            }

            // カーソルを新しい<p>タグ内に移動
            const newRange = document.createRange();
            newRange.setStart(newP, 0);
            newRange.setEnd(newP, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }

        // <h1>, <h2>, <h3>, <p>タグ内の処理
        else if (["H1", "H2", "H3", "P"].includes(parentElement.tagName)) {
          if (event.key === "Enter") {
            event.preventDefault(); // デフォルトのEnter動作をキャンセル

            // 新しい<p>タグを作成して挿入
            const newP = document.createElement("p");
            newP.innerHTML = "段落"; // 初期の段落テキスト
            parentElement.parentNode.insertBefore(newP, parentElement.nextSibling);

            // カーソルを新しい<p>タグ内に移動
            const newRange = document.createRange();
            newRange.setStart(newP, 0);
            newRange.setEnd(newP, 0);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      }
    });

    document.getElementById("ul_btn").addEventListener("click", () => {
      const editor = document.getElementById("editor");
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;

        // 現在のカーソルがテキストノードの場合は親要素を取得
        let parentElement = currentNode.nodeType === Node.TEXT_NODE 
          ? currentNode.parentElement 
          : currentNode;

        // 対象タグが h1, h2, h3, p, td の場合
        if (["H1", "H2", "H3", "P"].includes(parentElement.tagName)) {
          // 新しい<ul>タグと<li>タグを作成
          const ul = document.createElement("ul");
          const li = document.createElement("li");
          li.textContent = "リスト項目"; // 初期のリスト項目テキスト
          ul.appendChild(li);

          // 親要素の次の行に<ul>を挿入
          if (parentElement.nextSibling) {
            parentElement.parentNode.insertBefore(ul, parentElement.nextSibling);
          } else {
            parentElement.parentNode.appendChild(ul);
          }

          // カーソルを新しい<li>タグ内に移動
          const newRange = document.createRange();
          newRange.setStart(li, 0);
          newRange.setEnd(li, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        } else {
          alert("カーソルが h1, h2, h3, p タグ内にありません。");
        }
      }
    });

    // document.getElementById("table_btn").addEventListener("click", () => {
    //   const editor = document.getElementById("editor");

    //   // 行数と列数をユーザーに入力してもらう
    //   const rows = parseInt(prompt("行数を入力してください:", "2"), 10);
    //   const cols = parseInt(prompt("列数を入力してください:", "3"), 10);

    //   // 入力が正しい場合のみ処理を進める
    //   if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
    //     alert("有効な行数と列数を入力してください！");
    //     return;
    //   }

    //   // 新しい<table>を作成
    //   const table = document.createElement("table");
    //   table.className = "inner_table"

    //   // 指定された行数と列数に基づいて<tr>と<td>を作成
    //   for (let i = 0; i < rows; i++) {
    //     const tr = document.createElement("tr");
    //     for (let j = 0; j < cols; j++) {
    //       const td = document.createElement("td");
    //       td.textContent = `セル${i + 1}-${j + 1}`; // セルのデフォルトのテキスト
    //       tr.appendChild(td);
    //     }
    //     table.appendChild(tr);
    //   }

    //   // 新しい<p>タグを作成
    //   const newP = document.createElement("p");
    //   newP.innerHTML = "段落"; // 初期段落テキスト

    //   const selection = window.getSelection();

    //   if (selection.rangeCount > 0) {
    //     const range = selection.getRangeAt(0);
    //     const currentNode = range.startContainer;

    //     // 現在のカーソルがテキストノードの場合は親要素を取得
    //     let parentElement = currentNode.nodeType === Node.TEXT_NODE
    //       ? currentNode.parentElement
    //       : currentNode;

    //     // <h1>, <h2>, <h3>, <p>タグ内の処理
    //     if (["H1", "H2", "H3", "P"].includes(parentElement.tagName)) {
    //       // タグの次の行に<table>を挿入
    //       if (parentElement.nextSibling) {
    //         parentElement.parentNode.insertBefore(table, parentElement.nextSibling);
    //         parentElement.parentNode.insertBefore(newP, table.nextSibling);
    //       } else {
    //         parentElement.parentNode.appendChild(table);
    //         parentElement.parentNode.appendChild(newP);
    //       }
    //     }
    //     // <li>タグ内の処理
    //     else if (parentElement.tagName === "LI") {
    //       const ulElement = parentElement.parentNode; // 親の<ul>を取得

    //       // <ul>の次の行に<table>と<p>を挿入
    //       if (ulElement.nextSibling) {
    //         ulElement.parentNode.insertBefore(table, ulElement.nextSibling);
    //         ulElement.parentNode.insertBefore(newP, table.nextSibling);
    //       } else {
    //         ulElement.parentNode.appendChild(table);
    //         ulElement.parentNode.appendChild(newP);
    //       }
    //     } else {
    //       alert("適切なタグ内にカーソルがありません。");
    //       return;
    //     }

    //     // カーソルを<table>の最初のセルに移動
    //     const firstCell = table.querySelector("td");
    //     if (firstCell) {
    //       const newRange = document.createRange();
    //       newRange.setStart(firstCell, 0);
    //       newRange.setEnd(firstCell, 0);
    //       selection.removeAllRanges();
    //       selection.addRange(newRange);
    //     }
    //   }
    // });

    document.getElementById("table_btn").addEventListener("click", () => {
      const editor = document.getElementById("editor");

      // 行数と列数をユーザーに入力してもらう
      const rows = parseInt(prompt("行数を入力してください:", "2"), 10);
      const cols = parseInt(prompt("列数を入力してください:", "3"), 10);

      // 入力が正しい場合のみ処理を進める
      if (isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0) {
        alert("有効な行数と列数を入力してください！");
        return;
      }

      // 新しい<table>を作成
      const table = document.createElement("table");
      const tbody = document.createElement("tbody");

      // 指定された行数と列数に基づいて<tr>と<td>を作成
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
          const td = document.createElement("td");
          td.textContent = `セル${i + 1}-${j + 1}`; // セルのデフォルトのテキスト
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
      table.appendChild(tbody)

      const div = document.createElement("div");
      div.className = "table_box";
      table.className = "inner_table";
      div.appendChild(table);
      console.log(div.children);

      // 新しい<p>タグを作成
      const newP = document.createElement("p");
      newP.innerHTML = "段落"; // 初期段落テキスト

      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;

        // 現在のカーソルがテキストノードの場合は親要素を取得
        let parentElement = currentNode.nodeType === Node.TEXT_NODE
          ? currentNode.parentElement
          : currentNode;

          

        // <h1>, <h2>, <h3>, <p>タグ内の処理
        if (["H1", "H2", "H3", "P"].includes(parentElement.tagName)) {
          // タグの次の行に<table>を挿入
          if (parentElement.nextSibling) {
            parentElement.parentNode.insertBefore(div, parentElement.nextSibling);
            parentElement.parentNode.insertBefore(newP, div.nextSibling);
          } else {
            parentElement.parentNode.appendChild(div);
            parentElement.parentNode.appendChild(newP);
          }
        }
        // <li>タグ内の処理
        else if (parentElement.tagName === "LI") {
          const ulElement = parentElement.parentNode; // 親の<ul>を取得

          // <ul>の次の行に<table>と<p>を挿入
          if (ulElement.nextSibling) {
            ulElement.parentNode.insertBefore(div, ulElement.nextSibling);
            ulElement.parentNode.insertBefore(newP, div.nextSibling);
          } else {
            ulElement.parentNode.appendChild(div);
            ulElement.parentNode.appendChild(newP);
          }
        } else {
          alert("適切なタグ内にカーソルがありません。");
          return;
        }

        // カーソルを<table>の最初のセルに移動
        const firstCell = table.querySelector("td");
        if (firstCell) {
          const newRange = document.createRange();
          newRange.setStart(firstCell, 0);
          newRange.setEnd(firstCell, 0);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      }
    });

    document.getElementById("link_btn").addEventListener("click", () => {
      const editor = document.getElementById("editor");

      // href属性の値を入力するプロンプトを表示
      const url = prompt("リンク先のURLを入力してください:", "https://example.com");
      if (!url) {
        alert("URLが無効です。操作をキャンセルしました。");
        return;
      }

      // aタグのテキストを入力するプロンプトを表示
      const linkText = prompt("リンクのテキストを入力してください:", "ここをクリック");
      if (!linkText) {
        alert("リンクテキストが無効です。操作をキャンセルしました。");
        return;
      }

      // 新しい<a>タグを作成
      const aTag = document.createElement("a");
      aTag.href = url;
      aTag.textContent = linkText;
      aTag.target = "_blank"; // リンクを新しいタブで開く設定（必要に応じて変更可能）

      // 選択範囲またはキャレット位置に<a>タグを挿入
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // 選択範囲の内容を削除
        range.insertNode(aTag); // <a>タグを挿入
      } else {
        editor.appendChild(aTag); // 選択範囲がない場合はエディタの末尾に挿入
      }

      // カーソルを挿入した<a>タグの後に移動
      const newRange = document.createRange();
      newRange.setStartAfter(aTag);
      newRange.setEndAfter(aTag);
      selection.removeAllRanges();
      selection.addRange(newRange);
    });

    document.getElementById("image_btn").addEventListener("click", () => {
      const editor = document.getElementById("editor");

      // src属性をユーザーに入力してもらうプロンプトを表示
      const imgSrc = prompt("画像のURLを入力してください:", "https://example.com/image.jpg");
      if (!imgSrc) {
        alert("画像のURLが無効です。操作をキャンセルしました。");
        return;
      }

      // alt属性をユーザーに入力してもらうプロンプトを表示
      const imgAlt = prompt("画像の説明（alt属性）を入力してください:", "画像の説明");
      if (!imgAlt) {
        alert("画像の説明が無効です。操作をキャンセルしました。");
        return;
      }

      // 新しい<img>タグを作成
      const imgTag = document.createElement("img");
      imgTag.src = imgSrc;
      imgTag.alt = imgAlt;

      // キャレット位置または選択範囲に<img>タグを挿入
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents(); // 選択範囲の内容を削除
        range.insertNode(imgTag); // <img>タグを挿入
      } else {
        editor.appendChild(imgTag); // 選択範囲がない場合はエディタの末尾に挿入
      }

      // カーソルを挿入された<img>タグの後に移動
      const newRange = document.createRange();
      newRange.setStartAfter(imgTag);
      newRange.setEndAfter(imgTag);
      selection.removeAllRanges();
      selection.addRange(newRange);
    });

    document.getElementById("color_btn").addEventListener("click", () => {
      const colorPicker = document.getElementById("color");
      const selectedColor = colorPicker.value;
      const selection = window.getSelection();

      // 選択範囲が存在する場合
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.extractContents(); // 選択された内容を抽出

        // 現在のカーソル位置の親要素を確認
        const parentElement = range.startContainer.parentElement;

        // リセット処理（既存の色を削除）
        if (parentElement.tagName === "SPAN" && parentElement.style.color) {
          const spanParent = parentElement.parentNode;

          // 親の`<span>`を解除して元に戻す
          const textNode = document.createTextNode(parentElement.textContent);
          spanParent.replaceChild(textNode, parentElement);

        } else {
          // 色を変更する場合
          const span = document.createElement("span");
          span.style.color = selectedColor; // 選択された色を適用
          span.appendChild(selectedText);
          range.insertNode(span);

          // カーソルを選択範囲の後に移動
          range.setStartAfter(span);
          range.setEndAfter(span);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        alert("文字を選択してください。");
      }
    });


    document.getElementById("remove_span_btn").addEventListener("click", () => {
      const selection = window.getSelection();

      if (selection.rangeCount > 0) {
        // 現在のキャレット位置（または選択範囲）の親要素を取得
        const range = selection.getRangeAt(0);
        const parentElement = range.startContainer.nodeType === Node.TEXT_NODE 
          ? range.startContainer.parentElement 
          : range.startContainer;

        // 親要素内の<span>タグをすべて取得して削除
        const spans = parentElement.querySelectorAll("span");
        spans.forEach(span => {
          // spanタグを削除し、その内容を親要素に戻す
          const parent = span.parentNode;
          while (span.firstChild) {
            parent.insertBefore(span.firstChild, span);
          }
          parent.removeChild(span);
        });

        alert("キャレットがある位置の<span>タグをすべて削除しました。");
      } else {
        alert("キャレットの位置が見つかりません。");
      }
    });

    // エディター内にタグがなくなれば、自動的に<p><br></p>を挿入
    document.getElementById('editor').addEventListener('input', function() {
        const editor = document.getElementById('editor');
        if (editor.innerHTML.trim() === '') {
            editor.innerHTML = '<h1><br></h1>';
        }
    });

    const content = document.getElementById('content')
    const set = document.getElementById('set');
    document.addEventListener('mousemove', function(){
      console.log(editor.innerHTML)
      content.value = editor.innerHTML
    })
    document.addEventListener('keydown', function(){
      console.log(editor.innerHTML)
      content.value = editor.innerHTML
    })
  })