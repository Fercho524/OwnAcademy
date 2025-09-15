export class UserEntity {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public rol: string[],
        public password: string,
        public image?: string,
    ) {
    }
}
