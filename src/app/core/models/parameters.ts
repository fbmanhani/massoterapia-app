import { Position } from './position';
import { Unit } from './unit';

export class Parameters {
  id: string;
  unidade: Unit;
  quantidadePosicoes: number;
  positions: Array<Position>;
}
