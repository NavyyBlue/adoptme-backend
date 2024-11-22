import { applyDecorators, UseGuards, SetMetadata } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

export function Auth() {
    return applyDecorators(UseGuards(AuthGuard));
}