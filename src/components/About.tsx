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
              現況まとめ
            </h3>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">学年</h4>
                <p className="text-gray-600">修士2年（M2）</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800">就職</h4>
                <p className="text-gray-600">2026年4月から IT企業に新卒入社予定</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800">インターン歴</h4>
                <p className="text-gray-600">2025年3月から 有給長期インターン開始</p>
              </div>
              
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-gray-800">AtCoder</h4>
                <p className="text-gray-600">中断中</p>
              </div>
              
              <div className="border-l-4 border-pink-500 pl-4">
                <h4 className="font-semibold text-gray-800">松尾研 GCI</h4>
                <p className="text-gray-600">AI基礎講座 2025 Summer</p>
              </div>             
              
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg">
              <img 
                src="/images/icon.webp" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About