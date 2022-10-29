

const MedicosEletroneuromiografia = [
    {nome:"Dr. Igor Ornelas", local:"Hermes Pardini", telefone:"(31) 3228-6888"},
    {nome:"Dr. Bernardo Dias", local:"Conrad", telefone:"(31) 3247-3450"},
    {nome:"Dr. Lucas Roquim", local:"Consultório", telefone:"(31) 3223-0644"},
]

const MedicosRessonanciaEpilepsia = [
    {nome:"Dr. Frederico Abreu B. Guimarães", local:"Clínica ", telefone:"(31) 3228-6888"},
]

const MedicosPuncaoLombar = [
    {nome:"", local:"Hermes Pardini(Unidade Aimorés), particular e convênios", telefone:"(31) 3228-6200"},
    {nome:"", local:"CPS SAnta efigência (UNIMED), segundas-feiras, 13h00.", telefone:"(31) 3247-3450"},
    
]

const MedicosFisioterapia = [
    {nome:"Dra. Flávia Baggio Nerbass/Dra. Liliane Mendes",local:"The Clinic",telefone:"(31) 3586-2246/(31) 98113-7721"},
]

const MedicosFono = [
    {nome:"Dra. Ana Paula Gasparini",local:"Rua Alagoas 1000/1102 Savassi - BH",telefone:"(31) 4102-2829/(31) 97144-2829"},
]

const MedicosOdonto = [
    {nome:"Dra. Heloisa Lima Z. de Abreu",local:"",telefone:"(31) 99182-6683/(31) 3224-4190"},
    {nome:"Dra. Ana Paula Assis de Oliveira",local:"",telefone:"(31) 98689-1083/(31) 3282-5585"},
    {nome:"Dra. Beatriz Gonçalves Peixoto",local:"",telefone:"(31) 98838-4933"},
    {nome:"Dra. Maria de Lourdes R. Guimarães",local:"",telefone:"(31) 98775-7671/(31) 3227-3825"},
]

const MedicosPsicologia = [
    {nome:"Dra. Jéssica Diniz",local:"Rua Matias Cardoso 129/Pilotis - Santo Agostinho/BH",telefone:"(31) 98292-1336"},
]


export const Exames = [
    {nome:"Eletroneuromiografia",
     descricao: "",
     medicos:MedicosEletroneuromiografia},
    {nome:"Ressonância Magnética em Epilepsia",
     descricao:"A clínica conta com ressonância magnética de crânio, resolução de 3 tesla, investigação de epilepsia. Agendar em Equipamento de 3 Tesla e direcionar laudo aos cuidados do médico aqui indicado.", 
     medicos:MedicosRessonanciaEpilepsia},
    {nome:"Punção Lombar",
     descricao:"Procedimento feito por profissional treinado. Não é necessário jejum, e recomenda-se acompanhante. Não pode ser realizado na vigencia de anticoagulantes ou presença de distúrbios de coagulação grave. Obrigatório solocitaçã0. ",
     medicos:MedicosPuncaoLombar},
    {nome:"Fisioterapia CPAP",
     descricao:"Fisioterapia em Apneia do sono. Adaptação de CPAP.",
     medicos:MedicosFisioterapia},
    {nome:"Fonoaudiologia - Apneia do sono",
     descricao:"Atua em terpaia miofuncional e fonoaudiologia em apneia do sono.",
     medicos:MedicosFono},
    {nome:"Odontologia do Sono",
     descricao:"",
     medicos:MedicosOdonto},
    {nome:"Psicologia - TCC insônia",
     descricao:"Psicóloga especialista em Terapia Cognitivo Comportamental (TCC). Referência para o tratamento TCC para insônia. Membro da Liga Mineira do Sono",
     medicos:MedicosPsicologia},
    {nome:"Avaliação Neuropsicológica", descricao:"", medicos:""},
  ]




