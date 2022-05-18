"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllPostInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const util_1 = require("../util");
let GetAllPostInterceptor = class GetAllPostInterceptor {
    intercept(context, next) {
        console.log('Before...');
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            const formattedData = data.data.map(({ content, updatedAt, description, id, title, cloundinary, slug, createdAt, }) => ({
                content,
                updatedAt,
                description,
                id,
                title,
                cloundinary: cloundinary.url || cloundinary.secure_url,
                slug: slug ? slug : (0, util_1.changeToSlug)(title, createdAt),
            }));
            return Object.assign(Object.assign({}, data), { data: formattedData });
        }));
    }
};
GetAllPostInterceptor = __decorate([
    (0, common_1.Injectable)()
], GetAllPostInterceptor);
exports.GetAllPostInterceptor = GetAllPostInterceptor;
//# sourceMappingURL=get-all-post.interceptor.js.map