const About = () => {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                非情報系の大学院生
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                大学院で専攻する分野とは異なる道を選び、エンジニアリングの世界に飛び込みました。
                独学で始めたプログラミングは、今では私の情熱となり、日々新しい技術を学ぶことが楽しみです。
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                100日間のコーディングチャレンジを通じて、基礎から応用まで幅広く学習し、
                実践的なプロジェクトを通じてスキルを磨いています。
              </p>
              <p className="text-gray-600 leading-relaxed">
                常に新しい技術やアイデアに触れながら、ユーザーにとって価値のあるプロダクトを
                作ることを目指しています。
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="w-64 h-64 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-6xl">👨‍💻</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  export default About