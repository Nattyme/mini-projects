const START_BLOCK_NUMBERS = [1, 3, 6, 7, 10, 13, 19];

const elements = {
  headerEl : document.querySelector('#header')
}

const MAPSET = {
  CANVAS_WIDTH : 1200 * window.devicePixelRatio,
  CANVAS_HEIGHT : 340 * window.devicePixelRatio, 
  CANVAS_BACKGROUND : '#000',
  ROW_NUMBERS : 17,
  COLUMNS_NUMBERS : 60,
  PADDING : 0,
  downtime: getDowntime(),
  blockTypes: 19,
  get fieldWidth () {
    return this.CANVAS_WIDTH / this.COLUMNS_NUMBERS; // fieldWidth
  },
  get fieldHeight () {
    return this.CANVAS_HEIGHT / this.ROW_NUMBERS; // fieldHeight
  }
}

const canvas = {
  canvas : document.querySelector('#canvas'),
  get width() {
    return this.canvas.width; // Получаем ширину из DOM-элемента
  },
  set width(value) {
    this.canvas.width = value; // Устанавливаем ширину для DOM-элемента
  },
  get height() {
    return this.canvas.height; // Получаем высоту из DOM-элемента
  },
  set height(value) {
    this.canvas.height = value; // Устанавливаем высоту для DOM-элемента
  },
  get context () {
    return this.canvas.getContext('2d'); // Для отрисовки , не является DOM эл.
  },
}

// Ф-ция устанавливает размеры canvas
const setCanvasSize = function (size) {
  canvas.width = size.width;
  canvas.height = size.height;

  return size;
}

// Ф-ция считает время 'падения' блока
function getDowntime () {
  return 200;
}

// Ф-ция очищает поле
const clearCanvas = function () {
  const { CANVAS_BACKGROUND, CANVAS_WIDTH, CANVAS_HEIGHT } = MAPSET;

  canvas.context.fillStyle = CANVAS_BACKGROUND;
  canvas.context.strokeStyle = `rgba(255, 255, 255, 0.5)`;

  canvas.context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.context.fill();
  canvas.context.stroke();
}

// Ф-ция будет отрисовывать состояние map, всё что в неё есть
const drawState = function (map) {

  // Обходим каждый ряд
  for ( let y = 0; y < MAPSET.ROW_NUMBERS; y++) {
    // Обходим каждую клетку в ряду
    for ( let x = 0; x < MAPSET.COLUMNS_NUMBERS; x ++) {

      // Получаем значение матрицы по координатам x и y
      const field = map[y][x];

      // Если есть поле (не null) 
      if (field) {
        // рисуем клетку 
        drawField(x, y, field);
      }
    }
  }

  return map;
}

// Ф-ция закрашивает точку поля
const drawField = function (x, y, color) {
  const { fieldWidth, fieldHeight, PADDING } = MAPSET;

  canvas.context.strokestyle = color;
  canvas.context.strokeRect(
        x * fieldWidth + PADDING, 
        y * fieldHeight + PADDING, 
        fieldWidth - PADDING * 2, 
      fieldHeight - PADDING * 2);

}

// Ф-ция рисует блок
const drawBlock = function () {
  
  // Запрашиваем части блока, кот. нужно отобразить
  const parts = MAPSET.block.getIncludedParts();

  // Перебираем объекты массива parts
  for ( const part of parts) {
    // Передаем ф-ции координаты и цвет частицы
    drawField( part.x, part.y, MAPSET.block.color)
  }
}

// Ф-ция возвращает карту всех клеток поля, матрицу, 'массив массивовэ
const getMap = function () {
  const map = [];

  // Обходим каждый ряд поля
  for (let y = 0; y < MAPSET.ROW_NUMBERS; y++) {
    const row = [];

    // В ряду обходим каждую клетку поля
    for (let x = 0; x < MAPSET.COLUMNS_NUMBERS; x++) {
      // Добавляем в ряд значение NULL => т.е. создаем клетки
      row.push(null);
    }

    // Добавляем ряд в карту
    map.push(row);
  }

  return map;
}

// Функция удаляет блок через указанное время
const unsetBlockLater = function (time, x, y, map) {
  setTimeout(() => {
    setField(x, y, null, map);
  }, time);
} 

// Ф-ция превращает блок в структуру поля
function saveBlock (map) {
  // Получим части блока
  const parts = MAPSET.block.getIncludedParts();

  // Обходим все части и записываем координаты и цвет каждой в map
  for (const part of parts) {
    setTimeout(() => {
      // Добавляем блок
      setField(part.x, part.y, MAPSET.block.color, map);
      // Удаляем блок
      unsetBlockLater(40000, part.x, part.y, map);
    }, 0);
  }

}

// Ф-ция получает 4 аргумента: тип блока. цвет, координаты
function getBlock (type, color = `rgba(255, 255, 255, 0.5)`, x = 0, y = 0) {

  // Создаём блок
  const block = { type, x, y, color }

  //
  block.getIncludedParts = function () {
    // Лямба ф-ция, возвращает объект  с координатами фигуры блока
    const p = (dx, dy) => ({ x: block.x + dx, y: block.y + dy});
    // Тип фигуры - квадрат
    if (block.type === 1) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(1, 0), p(0, 1), p(1, 1)];
  
    }

    if (block.type === 2) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(1, 0), p(-1, 0)];
    }
    if (block.type === 3) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(1, 0), p(0, 1)];
    }
    if (block.type === 4) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(1, 0), p(0, 1), p(0, -1)];
    }
    if (block.type === 5) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(0, 1), p(0, -1)];
    }

    // Тип фигуры - гориз. 'четвёрка'
    if (block.type === 6) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(1, 0), p(0, 1), p(-1, 1)];
    }
    // Тип перев. фигуры - гориз. 'четвёрка'
    if (block.type === 7) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(0, 1), p(1, 1)];
    }

    // Тип фигуры -верт. 'четвёрка'
    if (block.type === 8) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(-1, -1), p(0, 1)];
    }
    // Тип перев. фигуры - верт. 'четвёрка'
    if (block.type === 9) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(-1, 0), p(-1, 1)];
    }

    // Тип фигуры - гориз. линия
    if (block.type === 10) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(1, 0), p(2, 0)];
    }
    // Тип фигуры - вертик линия
    if (block.type === 11) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(0, 1), p(0, 2)]
    }

    // Тип перев. фигуры - верт. 'Г'
    if (block.type === 12) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(1, 0), p(0, 1), p(0, 2)];
    }
    // Тип перев. фигуры 'Г'
    if (block.type === 13) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, 1), p(-1, 0), p(-2, 0)];
    }
    // Тип перев. фигуры - 'Г'
    if (block.type === 14) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(0, -2), p(-1, 0)];
    }
    // Тип перев. фигуры - 'Г'
    if (block.type === 15) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(1, 0), p(2, 0)];
    }

    // Тип перев. фигуры - зеркальная 'Г'
    if (block.type === 16) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(-1, 0), p(0, 1), p(0, 2)];
    }
    // Тип перев. фигуры - зеркальная 'Г'
    if (block.type === 17) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, -1), p(-1, 0), p(-2, 0)];
    }
    // Тип перев. фигуры - зеркальная 'Г'
    if (block.type === 18) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(1, 0), p(0, -1), p(0, -2)];
    }
    // Тип перев. фигуры - зеркальная 'Г'
    if (block.type === 19) {
      // Вернём массив из 4х блоков. Один - всегда статичен, отсальные меняются в зав-ти от типа фигуры
      return [p(0, 0), p(0, 1), p(1, 0), p(2, 0)];
    }
  }

  block.getNextBlock = function () {
    const p = n => getBlock(n, block.color, block.x, block.y);
    if ( block.type === 1 ) { return p(1) }

    
    if ( block.type === 2 ) { return p(3) }
    if ( block.type === 3 ) { return p(4) }
    if ( block.type === 4 ) { return p(5) }
    if ( block.type === 5 ) { return p(2) }

    if ( block.type === 6 ) { return p(7) }
    if ( block.type === 7 ) { return p(6) }

    if ( block.type === 8 ) { return p(9) }
    if ( block.type === 9 ) { return p(8) }

    if ( block.type === 10) { return p(11) }
    if ( block.type === 11) { return p(10) }

    if ( block.type === 12) { return p(13) }
    if ( block.type === 13) { return p(14) }
    if ( block.type === 14) { return p(15) }
    if ( block.type === 15) { return p(12) }

    if ( block.type === 16) { return p(17) }
    if ( block.type === 17) { return p(18) }
    if ( block.type === 18) { return p(19) }
    if ( block.type === 19) { return p(16) }
  }

  block.getCopy = function () {
    return getBlock ( block.type, block.color, block.x, block.y);
  }

  return block;
}

// Ф-ция проверяет, может ли блок разместиться в поле
const canBlockExists = function (block, map) {
  const parts = block.getIncludedParts();

  for ( const part of parts) {
    if (getField(part.x, part.y, map)) {  
      return false;
    }
  }

  return true;
}

// Ф-ция возвращает NULL , если поле свободно. В ином случае - 'white'
const getField = function (x, y, map) {
  if (map[y] === undefined || map[y][x] === undefined) {
    return 'white';
  }

  return map[y][x];
}

// Ф-ция устанавливает знач-е поля
const setField = function (x, y, value, map) {
  if (map[y] === undefined || map[y][x] === undefined) {
    return;
  }

  return map[y][x] = value;
}

// Ф-ция очищает поля
const clearLines = function () {
  let lines = 0;

  const {ROW_NUMBERS, COLUMNS_NUMBERS, map} = MAPSET;
  for (let y = ROW_NUMBERS - 1; y >= 0; y--) {
    let isFullLine = true;

    for ( let x = 0; x < COLUMNS_NUMBERS; x++) {
      if (!getField(x, y, map)) {
        isFullLine = false;
        break;
      }
    }

    // Если ряд заполнен
    if (isFullLine) {
      lines = lines + 1;
      for ( let t = y; t >= 1 ; t--) {
        for ( let x = 0; x < COLUMNS_NUMBERS; x++) {
          map[t][x] = map[t - 1][x];
          map[t - 1][x] = null;
        }
      }

      y = y + 1; // Увелич. на 1, чтобы повторно проверить ряд
    }

  }

  return lines;
}

// Ф-ция непрерывно совершает действия 
const tick = function (timestamp, map, randomBlockType, randomPlace) {

  // Если время с начала игры >= downtime 
  if (timestamp >= MAPSET.downtime) {
    // Созда1м копию и проверяем, можно ли сдвинуть
    const blockCopy = MAPSET.block.getCopy();
    blockCopy.y = blockCopy.y + 1;
   
    
    // Если сдвинули - увелич время downtime
    if (canBlockExists( blockCopy, map ) ) {
      MAPSET.block = blockCopy;
    } else {
 
      // в иноь случае блок 'уперся', значит , превращаем его в статич. структуру
      saveBlock(MAPSET.map);

      clearLines();
      MAPSET.block = getBlock( randomBlockType, `rgba(255, 255, 255, 0.5)`, randomPlace);
    }
 
    MAPSET.downtime = timestamp + getDowntime();
  }

  clearCanvas(); 
  drawBlock(); // Рисуем блок
  drawState(map)
}

// Ф-ция определяет цвет блока в зав-ти от типа записи ( расход или доход)
const getCanvasFigureColor = function (recordType) {
  // Установим цвет stroke
  let strokeColor;
  if (recordType === "inc") {
    strokeColor = `#dd5151`;
  } else if (recordType === "exp") {
    strokeColor = `#2fcc81`;
  }

  return strokeColor;
}

// Функция для временного изменения цвета блоков
function changeBlockColorTemporarily (color) {
  // Изменяем цвет на канвасе
  MAPSET.CANVAS_BACKGROUND = color;

  // Вернем цвет на стандартный через 1 секунду
  setTimeout(() => {
    MAPSET.CANVAS_BACKGROUND = '#000'; // возвращаем стандартный цвет
  }, 1000);
}



export { START_BLOCK_NUMBERS, MAPSET, canvas, elements, getCanvasFigureColor,  clearCanvas, drawField, drawBlock, getMap, drawState, setCanvasSize, getBlock, tick, getField, setField, changeBlockColorTemporarily  };