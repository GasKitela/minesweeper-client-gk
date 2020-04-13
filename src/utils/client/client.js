import axios from 'axios'
import humps from 'humps'

const BASE_URI = 'http://minesweeper-api-gk.herokuapp.com'; // "http://localhost:4433";

const api = {
    createGame: (rows, cols, mines) =>
        client.post(`/ms/new-game`,  {
            "rows": parseInt(rows),
            "cols": parseInt(cols),
            "mines": parseInt(mines)
        }),
    clickSquare: (game_id, row, col, action) =>
        client.put(`/ms/${game_id}/click`, {
            "row": parseInt(row),
            "col": parseInt(col),
            "action": action
        }),
}

const client = (() => {
    const instance = axios.create({
        baseURL: BASE_URI,
        transformResponse: [
            ...axios.defaults.transformResponse,
            data => humps.camelizeKeys(data)
        ],
        transformRequest: [
            data => humps.decamelizeKeys(data),
            ...axios.defaults.transformRequest
        ],
        headers: {
            'x-ajax': true
        }
    })


    return instance
})()

export default api
