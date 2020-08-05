# PokeStore Template  
## How to use:  
 + Check out one of the four stores:  
	 + http://fairy.leo-ferraz.com/;
	 + http://dragon.leo-ferraz.com/;
	 + http://fire.leo-ferraz.com/;
	 + http://ghost.leo-ferraz.com/
+ Change the variables.js file to list the pokemon type you wish your store to get from the API. THE POKEMON TYPE MUST BE LOWERCASE;
+ You can also edit the placeholder-banners' background color here too.
+ Run 'npm run build';
+ ???
+ Profit!

## Observações aos avaliadores:
- Como vocês pedem pra usar create-react-app, decidi não usar npm eject para ter acesso às configurações do webpack. Isso faz com que eu tenha que manualmente importar os arquivos globais em cada componente que os usam, ao invés de appendar o @import no data do sass-loader;
- Hospedado no EC2 da Amazon;
- Gestão de DNS pelo Route 53 da Amazon (fire.leo-ferraz.com, ghost.leo-ferraz.com, dragon.leo-ferraz.com e fairy.leo-ferraz.com) e pelo serviço de DNS do Registro.br (leoferraz.com.br).
- Os banners da home são placeholders. Tenho 0 habilidade de fazer um banner bonitinho à lá Marketing + Design.
- Bootstrap, Bootstrap Icons, SweetAlert2 e Slick como ferramentas de apoio para fazer as telas.
- Redux para gestão de estado do app. Ele sincroniza todas (quase todas?) as informações com o LocalStorage para garantir persistência de dados entre sessões.
- Versão desktop é a mais 'pronta.' Sem um designer do lado pra dar wireframe, proporções, etc, não sou bom de fazer telas mobile.
- Espalhei easter eggs pelo site. Caso estejam questionando por que você acham alguns digimons lá e cá, esse é um deles (cliquem em "Imported Pokemon")
- Não entendo nada de pokemon, então coloquei em evidência as informações que pareciam ser mais importantes na página de produto.
- Algumas features foram deixadas de lado pelo bem da brevidade do projeto:
	- Lista infinita no /catalog, que seria absolutamente necessário caso os produtos viessem de alguma API e não do redux/localStorage.
	- Newsletter e Login;
	- Autocomplete da barra de pesquisa. O modelo Catalog.js já está pronto pra satisfazer o requisito, mas gastei o tempo alocado pro front-end dos resultados em outras features :)
	- Formulário de informações pessoais + endereço pro checkout;
	- Landing Pages e páginas institucionais;
	- 404 e 500 customizadas (na verdade essas eu simplesmente esqueci de fazer e só lembrei depois de dar o projeto por feito :D)
