"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HistoryController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../dto");
const service_1 = require("../service");
let HistoryController = class HistoryController {
    constructor(historyService) {
        this.historyService = historyService;
    }
    async getHistory(queryHistoryDto) {
        return this.historyService.queryHistory(queryHistoryDto);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_2.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.QueryHistoryDto]),
    __metadata("design:returntype", Promise)
], HistoryController.prototype, "getHistory", null);
HistoryController = __decorate([
    (0, common_3.Controller)('history'),
    (0, swagger_1.ApiTags)('history'),
    __metadata("design:paramtypes", [service_1.HistoryService])
], HistoryController);
exports.HistoryController = HistoryController;
//# sourceMappingURL=history.controller.js.map