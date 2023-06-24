Para configurar o bando de dados sql server é necessário:
Ir em Serviços -> SQL Server Browser -> Propriedades -> Tipo de Inicialização -> Automático
Iniciar o serviço
Ir em gerenciamento do computador -> Serviços e aplicativos -> SQL server configuration -> SQL server network configuration -> protocols... -> ativar TCP/IP
Na conexão do banco de dados do ssms -> botão direito -> propriedades -> Security -> mudar para SQL Server and Windows Authentication mode
ir em security -> Logins -> new login
mudar para SQL Server and Authentication -> usuário e senha 'admin'
desmarcar parâmetro Enforce password policy
em server roles marcar sysadmin
