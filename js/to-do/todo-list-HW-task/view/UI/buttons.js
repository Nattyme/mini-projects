const buttons = {
  edit : `
              <button
                data-action="edit"
                type="button"
                class="btn btn-warning btn-sm float-right mr-1"
              >
                  Редактировать
              </button>
          `,
  delete : `
              <button
                data-action="delete"
                type="button"
                class="btn btn-danger btn-sm float-right mr-2"
              >
                  Удалить
              </button>
            `,
  save : `
            <button
              data-action="save"
              type="button"
              class="btn btn-success btn-sm float-right mr-1"
              style = "display: none"
            >
                Сохранить
            </button>
          `,
  cancel : `
              <button
                data-action="cancel"
                type="button"
                class="btn btn-light btn-sm float-right mr-2"
                style = "display: none"
              > 
                  Отмена
              </button>
            `
}

export { buttons };