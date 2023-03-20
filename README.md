# ecomm
Projeto de Ecommerce criando durante o programa LevelUp da Alura

## Metodologia dos 12 fatores 
### beneficios 
.Formato declarativo das necessidades
.Dependências declaradas de forma direta
.Facilidade de deploy e mudanças de ambientes
.Menos divergências entre os ambientes 
de desenvolvimento e produção
.Aplicações mais facilmente escaláveis
### Princípio 1- Codebase
Código controlado por um sistema de controle de versões
Esse fator é muito importante para separar o servidor do
código em produção, afim de que se ocorrer algum problema
na aplicação, os outros deploys assegurarão que o programa
não seja perdido. Esse código precisa ter um ambiente de 
desenvolvimento e um para deploy que tenham a mesma base, 
porém diferentes versão ativas em cada um. No caso desse
projeto, isso ocorre desde o começo, seguindo a ideia de
gitflow, cada Sprint de desenvolvimento foi feita em uma 
branch diferente, porem como não existem outros 
desenvolvedores, só existe uma branch para cada Sprint.

### Princípio 2- Dependencies
Declarar de forma explícita e isolar as dependências.
Deve existir um gerenciador de pacotes, que facilita
a visualização e instalação dos códigos de terceiros de 
forma explícita. Isso tambem serve para ferramentas de 
sistema. No caso desse Ecommerce, temos o npm que gerencia 
cada dependência, por exemplo, no diretorio de product,
temos o express, o mongoose, basta consultar o package.json .

### Princípio 3- Configurations
É importante que o projeto guarde as configurações no ambiente.
Configurações são banco de dados, serviços de email, no geral,
formas de acessar serviços externos. Guardar essas configurações
em variáveis de ambiente é importantíssimo, pois se o projeto, 
estiver no ambiente de produção terá configurações diferentes 
de se ele estivesse no ambiente de desenvolvimento. Esse arquivo
não deve ser versionado. No caso desse Ecommerce, isso não acontece
no caso do banco de dados, nem do Mongo, nem do MYSQL. A única 
configuração que isso vai ocorrer é na segurança com JWT, em que
uma variável de ambiente (KEY_JWT) guarda a chave geradora de tokens 
no serviço "./account/src/.env" , porem a chave fica esposta no 
versionamento do git, pois não foi acrescentado no .gitignore.

### Princípio 4- Backing services
O programa deve ser independente do banco de dados e serviços externos.
Caso esse seviço de apoio mude, o código não deve ter muitos problemas
para mudar para o outroserviço . Ao inves de depender de uma classe 
específica que pegue os clientes do banco, o ideal seria depender de uma 
interface que pega os clientes do banco, assim, poderiam ter varias 
interfaces, uma para o MYSQL outra pro MONGO e assim por diante, 
uma inversão de dependências.
É importante que isso aconteça para que, caso seja necessário conectar
com outro tipo de serviço, mudar uma pequena configuração troca o banco.
Nesse Ecommerce isso não ocorre, o MONGO e o MYSQL, recebes os valores 
atraves de uma classe que fica no model ao invés de receber uma interface
que depois leva os valores ao model.

### Principio 5- Build, Release, Run
O deploy de toda aplicação é dividido nas etapas de build, release e run.
O Build converte a aplicação em um executável.
O Release pega o executável e combina com o arquivo de config.
A etapa do Run é o final do deploy, de rodar literalmente em ambiente de 
execução. Interessante que até a etapa de run, é posível fazer rollbacks,
que se necessário voltam ao estado anterior.
Nessa Ecommerce, esse deploy em um servidor remoto não ocorre. O que 
acontece é que toda a aplicação se econtra em servidores locais, junto
com containeres que sobem pelo docker. Resumindo, o build, o release e o run
são todos feitos em ambiente local.

### Principio 6- Processes
Processos sem estado, ou seja, sem armazenar a sessão no 
servidor da aplicação. Se os processos armazenarem sessões,
isso abre campo para necessidade de autenticação de usuário 
a cada deploy, ou mesmo a cada alteraçãodo programa.
Assim, o objetivo desse princípio é armazenar
todas as informações que a aplicação precisa em serviços de apoio,
como um banco de dados, ou num servidor de arquivos.
No caso do Ecommerce, os dados são salvos em bancos de dados,
MONGO e MYSQL, em ambientes docker, que salvam em volumes específicos
armazenados no próprio notebook. Isso é correto, porém, os volumes
deveriam ser armazenados em outro servidor, um remoto seria o ideal.

### Principio 7- Port Binding
Exportar seviços através de portas. O próprio programa exporta HTTP
como serviço para ouvir as requisiçoes recebidas para determinada porta.
É uma aplicação autocontida, ela exporta portas httpe ele gerencia as 
requisições, logo não depende de um servidor externo.
Levando isso em consideração, esse Ecommerce faz isso, visto que 
ele mesmo gerencia as portas, por meio do localhost.

### Principio 8- Concurrency
A aplicação deve ser mais escalável, propondo concorrência.
No Ecommerce, isso acontece pelo simples fato do node ser 
single thread, pois ele obriga que ocorra a concorrência.
O Ecommerce não cria nenhuma thread adicional, logo, não existe
a concorrência de threads, porém, por causa das funções assincronas,
ocorre uma fila de Event loop o próprio JavaScript gerencia e acaba
por marcar um tipo de concorrência.

### Principio 9- Disposability
Início rapido e destruição bem feita. Fazer os processos começarem
rapidamente e encerrar dessa forma: parar de receber novas requisições,
não ouvir mais novas requisições e finalizar as requisções processando,
e depois devolver o processo. O principio se relaciona a facilidade com 
que um processo pode a qualquer instante sair do ar, então ele deve estar
pronta para voltar rapido num cenário caótico.
Nesse Ecommerce o começar rapidamente foi pensado, mas para finalizar
de forma adequada não foi idealizado.

### Principio 10- Dev/Prod parity
Manter os ambientes(desenvolvimento e produção) o mais similar possível.
Alguns ponto relevante são: constinuous deployment diminuindo o gap entre 
desenvolvimento e deploy, e tornando-os o mais semelhante o possível.
Como o Ecommerce ainda não está em produção, o ambiente ainda não existe.

### Principio 11- Logs
Os outputs que são postos, devem ser da forma mais simples, no próprio terminal.
No Ecommerce, a saída padrão está conforme esse princípio todos os logs estão na 
saída padrão.

### Principio 12- Admin processes
Processos que devem ser feitos apenas uma vez. Por exemplo, migração de banco.
Elas devem rodar em um ambiente idêntico ao que tarefas normais rodam. Nesse
Ecommerce, isso é feito, nas migrações de banco e nas própria queries de banco
que popularam o MONGO.