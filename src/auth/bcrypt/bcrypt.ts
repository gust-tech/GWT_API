import { Injectable } from "@nestjs/common"
import * as bcrypt from 'bcrypt'

@Injectable()
export class Bcrypt {

    async criptografarNumero(numeroGrupo: string): Promise<string>{

        let saltos: number = 10 
        return await bcrypt.hash(numeroGrupo, saltos);
    }

    async compararNumero(numeroBanco: string, numeroDigitado: string): Promise<boolean>{

        return bcrypt.compareSync(numeroDigitado, numeroBanco);
    }





}