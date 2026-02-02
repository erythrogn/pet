from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = 'sua_chave_segura_aqui'

def get_servicos():
    return [
        {
            'nome': 'Banho & Tosa',
            'slug': 'banho-tosa',
            'descricao': 'Estética completa com produtos hipoalergênicos e profissionais especializados.',
            'preco': 'R$ 80 - R$ 150',
            'itens': [
                'Shampoo especializado',
                'Hidratação premium',
                'Corte de unhas',
                'Limpeza de ouvidos'
            ]
        },
        {
            'nome': 'Hotel VIP',
            'slug': 'hotel',
            'descricao': 'Hospedagem premium com suítes climatizadas e monitoramento 24h.',
            'preco': 'R$ 120/diária',
            'itens': [
                'Suítes individuais',
                'Alimentação premium',
                'Passeios diários',
                'Câmeras 24h'
            ]
        },
        {
            'nome': 'Clínica Veterinária',
            'slug': 'vet',
            'descricao': 'Medicina veterinária completa com equipamentos de última geração.',
            'preco': 'Consulta R$ 200',
            'itens': [
                'Consultas especializadas',
                'Exames laboratoriais',
                'Vacinação',
                'Cirurgias'
            ]
        },
        {
            'nome': 'Day Care',
            'slug': 'daycare',
            'descricao': 'Socialização supervisionada com atividades recreativas.',
            'preco': 'R$ 90/dia',
            'itens': [
                'Atividades monitoradas',
                'Playground coberto',
                'Relatório diário',
                'Alimentação inclusa'
            ]
        },
        {
            'nome': 'Pet Taxi',
            'slug': 'taxi',
            'descricao': 'Transporte seguro e confortável para seu pet.',
            'preco': 'R$ 40 - R$ 80',
            'itens': [
                'Veículos adaptados',
                'Motorista especializado',
                'Monitoramento GPS',
                'Seguro'
            ]
        },
        {
            'nome': 'Adestramento',
            'slug': 'treinamento',
            'descricao': 'Treinamento comportamental com métodos positivos.',
            'preco': 'R$ 120/aula',
            'itens': [
                'Adestramento básico',
                'Correção comportamental',
                'Socialização',
                'Obediência'
            ]
        }
    ]

@app.route('/')
def index():
    servicos_home = get_servicos()[:4]
    
    depoimentos = [
        {
            'texto': 'A equipe do PawParadise transformou a saúde do meu cão. Profissionalismo e cuidado excepcionais.',
            'autor': 'Roberto Alves',
            'pet': 'Thor - Golden Retriever'
        },
        {
            'texto': 'O único lugar onde confio deixar minha gata quando viajo. Segurança e conforto total.',
            'autor': 'Carla Mendes',
            'pet': 'Luna - Siamês'
        },
        {
            'texto': 'Serviço premium com atenção aos detalhes. Meu poodle nunca foi tão bem cuidado.',
            'autor': 'Marcos Dias',
            'pet': 'Max - Poodle'
        }
    ]
    
    return render_template('index.html', 
                           servicos=servicos_home,
                           depoimentos=depoimentos)

@app.route('/servicos')
def servicos():
    lista_servicos = get_servicos()
    return render_template('servicos.html', servicos=lista_servicos)

@app.route('/sobre')
def sobre():
    valores = [
        {
            'nome': 'Excelência',
            'descricao': 'Compromisso com o mais alto padrão de qualidade em todos os serviços.',
            'emoji': '⭐'
        },
        {
            'nome': 'Integridade',
            'descricao': 'Transparência e honestidade em cada procedimento e comunicação.',
            'emoji': '🤝'
        },
        {
            'nome': 'Paixão',
            'descricao': 'Amor genuíno pelos animais guia cada uma de nossas ações.',
            'emoji': '❤️'
        }
    ]
    
    equipe = [
        {
            'nome': 'Dra. Ana Silva',
            'cargo': 'Médica Veterinária',
            'descricao': 'Especialista em cirurgia e cuidados intensivos.',
            'especialidade': '10 anos de experiência'
        },
        {
            'nome': 'Marcos Oliveira',
            'cargo': 'Head Groomer',
            'descricao': 'Especialista em estética canina premiado internacionalmente.',
            'especialidade': 'Certificado internacional'
        },
        {
            'nome': 'Carla Santos',
            'cargo': 'Adestradora',
            'descricao': 'Especialista em comportamento animal e métodos positivos.',
            'especialidade': 'Mestrado em etologia'
        },
        {
            'nome': 'Roberto Lima',
            'cargo': 'Gerente de Hospedagem',
            'descricao': 'Responsável pelo bem-estar dos hóspedes caninos e felinos.',
            'especialidade': '15 anos de experiência'
        }
    ]
    
    return render_template('sobre.html', valores=valores, equipe=equipe)

@app.route('/contato', methods=['GET', 'POST'])
def contato():
    lista_servicos = get_servicos()
    
    contatos_info = [
        {
            'tipo': 'Telefone',
            'valor': '<strong>(11) 98765-4321</strong>',
            'horario': 'Disponível das 8h às 20h',
            'emoji': '📞'
        },
        {
            'tipo': 'WhatsApp',
            'valor': '<strong>(11) 98765-4321</strong>',
            'horario': 'Atendimento 24h',
            'emoji': '💬'
        },
        {
            'tipo': 'E-mail',
            'valor': '<strong>contato@pawparadise.com</strong>',
            'horario': 'Resposta em até 24h',
            'emoji': '📧'
        }
    ]

    if request.method == 'POST':
        nome = request.form.get('nome')
        email = request.form.get('email')
        telefone = request.form.get('telefone')
        pet = request.form.get('pet')
        servico = request.form.get('servico')
        mensagem = request.form.get('mensagem')
        
        if not nome or not email or not mensagem:
            flash('Por favor, preencha todos os campos obrigatórios.', 'error')
            return render_template('contato.html', 
                                   servicos=lista_servicos, 
                                   contatos=contatos_info)
        
        print("=" * 50)
        print("NOVO CONTATO RECEBIDO:")
        print(f"Nome: {nome}")
        print(f"E-mail: {email}")
        print(f"Telefone: {telefone}")
        print(f"Pet: {pet}")
        print(f"Serviço de interesse: {servico}")
        print(f"Mensagem: {mensagem}")
        print("=" * 50)
        
        flash(f'Obrigado, {nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.', 'success')
        return redirect(url_for('contato'))

    return render_template('contato.html', 
                           servicos=lista_servicos, 
                           contatos=contatos_info)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
