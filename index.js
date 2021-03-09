"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Valida o acesso de rotas
 * O que não estiver em auth ou global, será considerado rota privada
 */
var RoutesValidator = /** @class */ (function () {
    function RoutesValidator(routes) {
        var _this = this;
        this.global = [];
        this.auth = [];
        /**
         * Caso esteja em uma rota de autenticação e sem permissão, para onde deve ser redirecionado?
         */
        this.inAuthRedirectTo = '/';
        /**
         * Se estiver em uma rota privado e sem sessão, para onde deve ser redirecionado?
         */
        this.inPrivateRedirectTo = '/';
        /**
         * Token não é um valor obrigatório. Você pode passar um valor quando desejar validar rotas de sessão
         */
        this.token = '';
        /**
         * Função não obrigatória. Você pode passar uma função de callback quando desejar executar algo após a validação de sessão
         * @returns any
         */
        this.callback = function () { return null; };
        /**
         * Valida as rotas quando está em sessão
         * @returns void
         */
        this.routesInSession = function () {
            var params = window.location.pathname.split('/');
            var inAuth = _this.checkAuth(params);
            if (inAuth) {
                window.location.href = _this.inAuthRedirectTo;
            }
            else {
                _this.callback();
            }
        };
        /**
         * Verifica o parâmetro da rota atual com as rotas informadas
         * @returns boolean
         */
        this.combineParams = function (currentRoute, route) {
            var result = false;
            Object.keys(route).map(function (key) {
                var param = route[key];
                if ((param.indexOf(':') >= 0) || (param === currentRoute[key])) {
                    result = true;
                }
                else {
                    result = false;
                }
            });
            return result;
        };
        /**
         * Verifica a rota atual nas rotas de auth
         * @returns number
         */
        this.checkAuth = function (params) {
            return _this.auth.filter(function (item) {
                var splited = item.split('/');
                if (splited.length === params.length) {
                    if (_this.combineParams(params, splited)) {
                        return item;
                    }
                }
            }).length;
        };
        /**
         * Verifica a rota atual nas rotas globais
         * @returns number
         */
        this.checkGlobal = function (params) {
            return _this.global.filter(function (item) {
                var splited = item.split('/');
                if (splited.length === params.length) {
                    if (_this.combineParams(params, splited)) {
                        return item;
                    }
                }
            }).length;
        };
        /**
         * Valida as rotas quando está sem sessão
         * @returns void
         */
        this.routesWithoutSession = function () {
            var params = window.location.pathname.split('/');
            var inAuth = _this.checkAuth(params);
            var inGlobal = _this.checkGlobal(params);
            if (!inAuth && !inGlobal) {
                window.location.href = _this.inPrivateRedirectTo;
            }
        };
        /**
         * Inicia a validação das rotas
         * @returns void
         */
        this.init = function () {
            if (_this.token.length) {
                _this.routesInSession();
            }
            else {
                _this.routesWithoutSession();
            }
            return true;
        };
        this.global = routes.global;
        this.auth = routes.auth;
        this.inAuthRedirectTo = routes.inAuthRedirectTo;
        this.inPrivateRedirectTo = routes.inPrivateRedirectTo;
    }
    return RoutesValidator;
}());
exports.default = RoutesValidator;
//# sourceMappingURL=index.js.map