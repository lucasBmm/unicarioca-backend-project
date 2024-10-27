import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/material';
import './Vacancy.css';

const jobListings = [
  {
    title: "Desenvolvedor Front-end",
    description: "Responsável por implementar interfaces web utilizando React.",
    requirements: "Experiência com JavaScript, React, HTML, CSS.",
    location: "São Paulo, SP"
  },
  {
    title: "Analista de Dados",
    description: "Realizar análise de grandes volumes de dados e gerar relatórios para suporte a decisões.",
    requirements: "Experiência com SQL, Python, Power BI.",
    location: "Rio de Janeiro, RJ"
  },
  {
    title: "Engenheiro de Software",
    description: "Desenvolvimento e manutenção de sistemas distribuídos de alta performance.",
    requirements: "Experiência com Java, Spring Boot, microservices.",
    location: "Curitiba, PR"
  },
  {
    title: "Designer UX/UI",
    description: "Criar protótipos e wireframes, garantindo a melhor experiência do usuário.",
    requirements: "Conhecimento em Figma, Sketch, Adobe XD.",
    location: "Porto Alegre, RS"
  },
  {
    title: "Administrador de Redes",
    description: "Gerenciar a infraestrutura de redes e servidores, garantindo alta disponibilidade.",
    requirements: "Conhecimento em Linux, Windows Server, AWS.",
    location: "Belo Horizonte, MG"
  },
  {
    title: "Especialista em Segurança da Informação",
    description: "Implementar políticas de segurança e realizar auditorias.",
    requirements: "Conhecimento em segurança de rede, firewalls, criptografia.",
    location: "Brasília, DF"
  },
  {
    title: "Gerente de Projetos",
    description: "Liderar projetos de TI, gerenciando prazos, orçamentos e equipe.",
    requirements: "Certificação PMP, experiência em gestão de projetos ágeis.",
    location: "Florianópolis, SC"
  },
  {
    title: "Analista de Marketing Digital",
    description: "Desenvolver e executar campanhas de marketing digital.",
    requirements: "Conhecimento em SEO, Google Ads, redes sociais.",
    location: "Salvador, BA"
  },
  {
    title: "Cientista de Dados",
    description: "Construir modelos preditivos e gerar insights com base em dados.",
    requirements: "Experiência com machine learning, Python, R.",
    location: "Fortaleza, CE"
  },
  {
    title: "Consultor SAP",
    description: "Implementar e manter módulos SAP para clientes de grande porte.",
    requirements: "Experiência com SAP MM, FI, CO.",
    location: "Campinas, SP"
  }
];

const Vacancy = () => {
  return (
    <div className='background-vacancy'>
      <hr/>
      <div className='title-vacancy'>
        <span style={{ fontSize: '40px'}}>VAGAS</span>
        <br/><br/>
        <span>800 vagas abertas no momento</span>
      </div>
      <Grid container spacing={2} justifyContent="center">
        {jobListings.map((job, index) => (
          <Grid item xs={3} sm={3} md={3} key={index} style={{ display: 'flex' }}>
            <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <CardContent className="card-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                <div>
                  <h3>{job.title}</h3>
                  <p>{job.description}</p>
                  <p><strong>Requisitos:</strong> {job.requirements}</p>
                  <p><strong>Localização:</strong> {job.location}</p>
                </div>
                <Button variant="contained" color="secondary">Inscrição</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Vacancy;