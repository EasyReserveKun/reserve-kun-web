//Import Component
import HanakoSato from './HanakoSato';
import TaroTanaka from './TaroTanaka';
import IchiroSuzuki from './IchiroSuzuki';
import MisakiTakahashi from './MisakiTakahashi';
import KentaNakamura from './KentaNakamura';

const advisors = {
  HanakoSato: { path: "/satohanako", component: <HanakoSato /> },
  TaroTanaka: { path: "/tanakataro", component: <TaroTanaka /> },
  IchiroSuzuki: { path: "/suzukiichiro", component: <IchiroSuzuki /> },
  MisakiTakahashi: { path: "/takahashimisaki", component: <MisakiTakahashi /> },
  KentaNakamura: { path: "/nakamurakenta", component: <KentaNakamura /> }
};

export default advisors;
