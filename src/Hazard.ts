class Hazard {
    constructor(
        private name: string,
        private desc: string,
        private removeBy: string
    ) {}

    public getName(): string {
        return this.name;
    }

    public getDesc(): string {
        return this.desc;
    }

    public getRemoveBy(): string {
        return this.removeBy;
    }
}

export default Hazard;
