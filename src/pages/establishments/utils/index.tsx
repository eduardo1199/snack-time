import Image from 'next/image'

export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});


export const renderLogoEstablishment = (name: string) => {
  const Logo = {
    'Cacau Show': <Image src="/cacau_show.png" width="150px" height="150px" layout="fixed" />,
    'Sttupendo Delivery': <Image src="/sttupendo.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Gigantes do Açaí': <Image src="/gigantes.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Siciliana': <Image src="/siciliana.jpeg"  width="150px" height="150px" layout="fixed"/>,
    "Mcdonald's": <Image src="/mc.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Camarões Delivery': <Image src="/camarões.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Bari Palesi': <Image src="/bari.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Reis Magos': <Image src="/reis.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Rafaela Fontes Chocolateria': <Image src="/rafaela.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Açaí Estanislau': <Image src="/cantinho.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Burger King': <Image src="/burguer.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Pittsburg': <Image src="/pitts.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Ki-pão Premium': <Image src="/kipao.jpeg"  width="150px" height="150px" layout="fixed"/>,
    'Doce Portugal': <Image src="/docePortugal.png"  width="150px" height="150px" layout="fixed"/>,
    'Casa dos Salgados Gourmet': <Image src="/CasaDosSalgado.png"  width="150px" height="150px" layout="fixed"/>,
    'Loucos por Coxinha': <Image src="/LoucosPorCoxinha.png" width="150px" height="150px" layout="fixed" />,
    'Panificadora Pães Dourados': <Image src="/cacau_show.png" width="150px" height="150px" layout="fixed"/>,
    'Master Coxinha': <Image src="/MasterCoxinhaLogo.png"  width="150px" height="150px" layout="fixed"/>,
  }

  return Logo[name];
}

export const renderLogoFoods = [ 
  <Image src="/logoFoods/bombomgrancherie.png" width="150px" height="150px" layout="fixed" />,     
  <Image src="/logoFoods/gelato.png"  width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/ovobenditocacao.png"  width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/ovocacaumagiaaoleite.png" width="150px" height="150px" layout="fixed"/>,    
  <Image src="/logoFoods/ovolanut.png"  width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/preciosidadessortido.png"  width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/TableteDreamsMilFolhasAvelã130g.png"  width="150px" height="150px" layout="fixed"/>,    
  <Image src="/logoFoods/TableteDreamsTortadeMaracujá130g.png" width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/trufacoco.png"  width="150px" height="150px" layout="fixed"/>,     
  <Image src="/logoFoods/trufamaracuja.png" width="150px" height="150px" layout="fixed" />
];