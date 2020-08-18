import VueRouter from 'vue-router';
import NumberBaseball from '../01-number-baseball/number-baseball/numberBaseball';
import ResponseCheck from '../02-responseCheck/responseCheck';
import RockScissorPaper from '../03-rockScissorPaper/rockScissorPaper';
import LottoGenerator from '../04-lottoGenerator/lottoGenerator';
// import TicTacToe  from '../05-tictactoe/TicTacToe';
// import Minesweeper from '../07-minesweeper/MineSweeper';

export default new VueRouter({
    routes: [
        { path: '/number-baseball', component: NumberBaseball },
        { path: '/response-check', component:  ResponseCheck },
        { path: '/rockscissorpaper', component: RockScissorPaper },
        { path: '/lottery-generator', component:  LottoGenerator },
        // { path: '/tic-tac-toe', component: TicTacToe },
        // { path: '/minesweeper', component:  Minesweeper  },
    ],
})