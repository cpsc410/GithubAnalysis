export class Flags  {
    private languageSpec: string;
    private commitCont: string;
    private netEffect: string;
    private fileCont: string;

    constructor(l: string, c: string, n: string, f: string) {
        this.languageSpec = l;
        this.commitCont = c;
        this.netEffect = n;
        this.fileCont = f;
    }

    public getFlagLanguageSpec() {
        return this.languageSpec;
    }

    public getFlagCommitCont() {
        return this.commitCont;
    }

    public getFlagNetEffect() {
        return this.netEffect;
    }

    public getFlagFileCont() {
        return this.fileCont;
    }
}
