import '../App.css';
import '../home/components/ContentItem.css'

// Import Components
import ContentItem from './components/ContentItem';
import Header from '../common/Header.js';
import Search from './components/Search.js'
import ServiceDescription from './components/ServiceDescription';
import Footer from '../common/Footer.js';
import Toolbar from '../common/Toolbar.js'

//Import Images
import hanakoImage from '../Image/Hanako.png';
import TaroImage from '../Image/Taro.png';
import IchiroImage from '../Image/Ichiro.png';
import MisakiImage from '../Image/Misaki.png';
import KentaImage from '../Image/Kenta.png';

import DebugSession from '../common/DebugSession.js';


function Home() {

  if (sessionStorage.getItem('AccountName') !== null) {
    return (
      <div>
        <Header />
        <Search />
        <ServiceDescription />
        <ContentItem text="建築士資格を持ち、20年以上のリフォーム業界経験を持つ佐藤花子は、住宅の修繕やリフォームのプロフェッショナルです。設計から施工までを一貫してサポートし、省エネ改修やバリアフリーリフォームなど、最新の技術とトレンドに精通しています。細部にまでこだわる丁寧な仕事が評判で、安心してお任せいただけます。おうちの修繕やリフォームは、佐藤花子にご相談ください。" imgUrl={hanakoImage} supervisor="家の修繕のスーパーバイザー" name="佐藤花子" url="/satohanako" />


        <ContentItem text="田中太郎は30年以上の不動産業界経験を誇るベテランスーパーバイザーです。土地や住宅の売買、賃貸、管理に関する豊富な専門知識を持ち、特に住宅ローンや資産運用のアドバイスには定評があります。お客様のニーズに合わせた最適な不動産戦略を提案し、多くの顧客から信頼を得ています。不動産に関するあらゆるご相談は、田中太郎にお任せください。" imgUrl={TaroImage} supervisor="不動産のスーパーバイザー" name="田中太郎" url="/tanakataro" />


        <ContentItem text="鈴木一郎は、介護福祉士として25年のキャリアを持つスーパーバイザーです。高齢者ケアや施設運営の専門知識が豊富で、特に認知症ケアや在宅介護の支援に力を入れています。利用者とその家族に寄り添ったサポートを提供し、多くの実績を持つ鈴木一郎が、常に新しい介護技術の習得に努めながら、安心して介護を受けられる環境を整えます。介護に関するご相談は、鈴木一郎にお任せください。" imgUrl={IchiroImage} supervisor="介護のスーパーバイザー" name="鈴木一郎" url="/suzukiichiro" />

        <ContentItem text="ファイナンシャルプランナー資格を持ち、15年以上の経験を誇る高橋美咲は、終活や相続に関する法的・財務的なアドバイスの専門家です。遺言書作成や相続税対策、財産分割の相談に応じ、クライアントの意思を尊重したプランを提案します。安心して終活を進められるよう、高橋美咲が全力でサポートいたします。終活や相続に関するご相談は、高橋美咲にお任せください。" imgUrl={MisakiImage} supervisor="終活・相続のスーパーバイザー" name="高橋美咲" url="/takahashimisaki" />


        <ContentItem text="保険業界で20年以上の経験を持つ中村健太は、特に自動車保険や生命保険の分野に精通したスーパーバイザーです。クライアントのライフスタイルに合わせた保険商品の提案や見直しを行い、最適な保障を提供します。また、金融商品についても幅広い知識を持ち、資産運用やリスク管理のアドバイスも行っています。車や保険、金融に関するご相談は、中村健太にお任せください。どうぞお気軽にご利用ください。" imgUrl={KentaImage} supervisor="車や保険・金融のスーパーバイザー" name="中村健太" url="/nakamurakenta" />

        <Footer />
        <Toolbar />
      </div>
    );
  } else {
    return (

      <div>
        <Header />
        <DebugSession type="Login" />
        <Search />
        <ServiceDescription />
        <ContentItem text="建築士資格を持ち、20年以上のリフォーム業界経験を持つ佐藤花子は、住宅の修繕やリフォームのプロフェッショナルです。設計から施工までを一貫してサポートし、省エネ改修やバリアフリーリフォームなど、最新の技術とトレンドに精通しています。細部にまでこだわる丁寧な仕事が評判で、安心してお任せいただけます。おうちの修繕やリフォームは、佐藤花子にご相談ください。" imgUrl={hanakoImage} supervisor="家の修繕のスーパーバイザー" name="佐藤花子" url="/satohanako" />


        <ContentItem text="田中太郎は30年以上の不動産業界経験を誇るベテランスーパーバイザーです。土地や住宅の売買、賃貸、管理に関する豊富な専門知識を持ち、特に住宅ローンや資産運用のアドバイスには定評があります。お客様のニーズに合わせた最適な不動産戦略を提案し、多くの顧客から信頼を得ています。不動産に関するあらゆるご相談は、田中太郎にお任せください。" imgUrl={TaroImage} supervisor="不動産のスーパーバイザー" name="田中太郎" url="/tanakataro" />


        <ContentItem text="鈴木一郎は、介護福祉士として25年のキャリアを持つスーパーバイザーです。高齢者ケアや施設運営の専門知識が豊富で、特に認知症ケアや在宅介護の支援に力を入れています。利用者とその家族に寄り添ったサポートを提供し、多くの実績を持つ鈴木一郎が、常に新しい介護技術の習得に努めながら、安心して介護を受けられる環境を整えます。介護に関するご相談は、鈴木一郎にお任せください。" imgUrl={IchiroImage} supervisor="介護のスーパーバイザー" name="鈴木一郎" url="/suzukiichiro" />

        <ContentItem text="ファイナンシャルプランナー資格を持ち、15年以上の経験を誇る高橋美咲は、終活や相続に関する法的・財務的なアドバイスの専門家です。遺言書作成や相続税対策、財産分割の相談に応じ、クライアントの意思を尊重したプランを提案します。安心して終活を進められるよう、高橋美咲が全力でサポートいたします。終活や相続に関するご相談は、高橋美咲にお任せください。" imgUrl={MisakiImage} supervisor="終活・相続のスーパーバイザー" name="高橋美咲" url="/takahashimisaki" />


        <ContentItem text="保険業界で20年以上の経験を持つ中村健太は、特に自動車保険や生命保険の分野に精通したスーパーバイザーです。クライアントのライフスタイルに合わせた保険商品の提案や見直しを行い、最適な保障を提供します。また、金融商品についても幅広い知識を持ち、資産運用やリスク管理のアドバイスも行っています。車や保険、金融に関するご相談は、中村健太にお任せください。どうぞお気軽にご利用ください。" imgUrl={KentaImage} supervisor="車や保険・金融のスーパーバイザー" name="中村健太" url="/nakamurakenta" />

        <Footer />
        <Toolbar />
      </div>
    );
  }
}
export default Home;