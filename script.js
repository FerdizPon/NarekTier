const draggables = document.querySelectorAll('.draggable');
const drops = document.querySelectorAll('.tier-drop, .tier-trash');

draggables.forEach(img => {
  img.addEventListener('dragstart', () => {
    img.classList.add('dragging');
  });

  img.addEventListener('dragend', () => {
    img.classList.remove('dragging');
  });
});

drops.forEach(drop => {
  drop.addEventListener('dragover', (e) => {
    e.preventDefault();
    drop.classList.add('drag-over');
  });

  drop.addEventListener('dragleave', () => {
    drop.classList.remove('drag-over');
  });

  drop.addEventListener('drop', () => {
    const dragged = document.querySelector('.dragging');
    if (!dragged) return;
    drop.classList.remove('drag-over');

    const newImg = dragged.cloneNode(true);
    newImg.classList.remove('dragging');

    // Заменяем src на GIF (анимированное)
    if (newImg.dataset.gif) {
      newImg.src = newImg.dataset.gif;
    }

    newImg.addEventListener('dragstart', () => {
      newImg.classList.add('dragging');
    });
    newImg.addEventListener('dragend', () => {
      newImg.classList.remove('dragging');
    });

    drop.appendChild(newImg);
    dragged.remove();

    // Воспроизведение звука (с именем gif файла, но с mp3)
    const fileName = newImg.dataset.gif
      ? newImg.dataset.gif.split('/').pop().split('.')[0]
      : newImg.src.split('/').pop().split('.')[0];
    const audioPath = `mp/${fileName}.mp3`;
    const audio = new Audio(audioPath);
    audio.play().catch(e => {
      console.warn('Ошибка воспроизведения аудио:', e);
    });
  });
});

// Редактируемые заголовки с защитой от пустого текста
const editableLabels = document.querySelectorAll('.tier-label[contenteditable="true"]');

editableLabels.forEach(label => {
  const defaultText = label.textContent;
  label._defaultText = defaultText;

  label.addEventListener('input', () => {
    if (label.textContent.trim()) {
      label._defaultText = label.textContent;
    }
  });

  label.addEventListener('blur', () => {
    if (!label.textContent.trim()) {
      label.textContent = label._defaultText;
    }
  });
});
