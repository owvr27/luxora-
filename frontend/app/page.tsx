'use client';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white py-24 md:py-32 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="text-sm font-semibold">♻️ نظام ذكي لإدارة النفايات</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in leading-tight">
            Luxora Environmental
          </h1>
          <p className="text-2xl md:text-3xl mb-4 text-green-50 font-semibold">
            حماية البيئة أصبحت أسهل وأكثر متعة
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-green-100 mb-10 leading-relaxed">
            انضم إلى آلاف الأشخاص الذين يحولون النفايات إلى نقاط ومكافآت قيمة. كل إعادة تدوير تقوم بها تساهم في بناء مستقبل أنظف للأجيال القادمة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/register"
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-green-300/50 hover:scale-105 transform"
            >
              ابدأ الآن مجاناً 🚀
            </a>
            <a
              href="/bins"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
            >
              اكتشف الحاويات الذكية
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Statistics Section - Hook Visitors */}
      <section className="py-16 px-4 bg-white -mt-10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">مستخدم نشط</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-center text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">كيلوغرام معاد تدويره</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-center text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-sm opacity-90">مكافأة تم استبدالها</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-center text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold mb-2">200+</div>
              <div className="text-sm opacity-90">حاوية ذكية</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Luxora Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              لماذا Luxora Environmental؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نحن لا نقدم فقط نظام إدارة النفايات - نحن نبني مجتمعاً من الأشخاص المهتمين بالبيئة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-green-500">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">سهل وسريع</h3>
              <p className="text-gray-600 leading-relaxed">
                استخدم الحاويات الذكية، احصل على الرمز، واستبدله بنقاط في ثوانٍ. لا حاجة لانتظار طويل أو إجراءات معقدة.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-blue-500">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">مكافآت حقيقية</h3>
              <p className="text-gray-600 leading-relaxed">
                اكسب نقاطاً حقيقية واستبدلها بمكافآت قيمة - من قسائم التسوق إلى الخصومات الحصرية والمزيد.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-t-4 border-emerald-500">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">تأثير حقيقي</h3>
              <p className="text-gray-600 leading-relaxed">
                كل إعادة تدوير تساهم في تقليل التلوث وحماية البيئة. شاهد تأثيرك الإيجابي على الكوكب.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Section - Enhanced */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12 border border-gray-100">
            <div className="text-center mb-10">
              <div className="inline-block px-6 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
                مقال خاص
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4" dir="rtl">
                حماية البيئة: مسؤوليتنا المشتركة
              </h2>
            </div>
            
            <div className="max-w-none text-right" dir="rtl">
              <div className="bg-blue-50 border-r-4 border-blue-500 p-6 rounded-lg mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  البيئة هي هبة من الله عز وجل، وهي الأساس الذي تقوم عليه حياتنا. كل يوم، نرى آثار التلوث والتدهور البيئي تزداد بشكل مقلق. من تلوث الهواء والماء إلى تراكم النفايات في المحيطات والغابات، نحن نواجه تحديات بيئية كبيرة تتطلب منا جميعاً اتخاذ إجراءات فورية.
                </p>
              </div>

              <h3 className="text-3xl font-semibold text-green-700 mt-10 mb-6 flex items-center gap-3">
                <span className="text-4xl">❓</span>
                لماذا يجب أن نهتم بالبيئة؟
              </h3>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                البيئة الصحية ضرورية لبقاء الإنسان والكائنات الحية الأخرى. عندما نتلوث البيئة، فإننا لا نؤذي فقط الطبيعة، بل أيضاً صحتنا وصحة أطفالنا. تلوث الهواء يسبب أمراض الجهاز التنفسي، وتلوث الماء يهدد مصادرنا الغذائية، وتراكم النفايات يخلق بيئة غير صحية ويساهم في تغير المناخ.
              </p>

              <h3 className="text-3xl font-semibold text-green-700 mt-10 mb-6 flex items-center gap-3">
                <span className="text-4xl">💡</span>
                كيف يمكننا إنقاذ البيئة؟
              </h3>

              <div className="space-y-6 mt-8">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-r-4 border-green-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <span>♻️</span>
                    1. إعادة التدوير والفرز
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    إعادة التدوير هي واحدة من أهم الطرق لحماية البيئة. من خلال فرز النفايات وإعادة تدوير المواد القابلة للتدوير مثل البلاستيك والورق والزجاج والمعادن، يمكننا تقليل كمية النفايات التي تذهب إلى المكبات وتقليل استهلاك الموارد الطبيعية. مع <strong>Luxora Environmental</strong>، أصبحت إعادة التدوير سهلة ومجزية!
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-r-4 border-blue-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-blue-800 mb-3 flex items-center gap-2">
                    <span>🚫</span>
                    2. تقليل استهلاك البلاستيك
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    البلاستيك يستغرق مئات السنين للتحلل ويسبب ضرراً كبيراً للبيئة البحرية. استخدم أكياس قابلة لإعادة الاستخدام، واشترِ منتجات بكميات أقل من التعبئة البلاستيكية، واستخدم زجاجات ماء قابلة لإعادة الاستخدام بدلاً من الزجاجات البلاستيكية.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-r-4 border-emerald-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                    <span>💡</span>
                    3. توفير الطاقة
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    استخدم المصابيح الموفرة للطاقة، وأطفئ الأجهزة الإلكترونية عندما لا تستخدمها، واختر الأجهزة الموفرة للطاقة. كل هذه الخطوات البسيطة تساعد في تقليل انبعاثات الكربون وحماية البيئة.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-r-4 border-teal-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-teal-800 mb-3 flex items-center gap-2">
                    <span>🚲</span>
                    4. استخدام النقل المستدام
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    استخدم وسائل النقل العام، أو المشي، أو ركوب الدراجة بدلاً من القيادة وحدك. هذا يساعد في تقليل انبعاثات غازات الاحتباس الحراري وتحسين جودة الهواء.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-r-4 border-amber-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-amber-800 mb-3 flex items-center gap-2">
                    <span>🌳</span>
                    5. زراعة الأشجار والنباتات
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    الأشجار تمتص ثاني أكسيد الكربون وتنتج الأكسجين، مما يساعد في تحسين جودة الهواء ومكافحة تغير المناخ. ازرع شجرة في حديقتك أو شارك في حملات التشجير في منطقتك.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-r-4 border-purple-500 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <h4 className="text-2xl font-semibold text-purple-800 mb-3 flex items-center gap-2">
                    <span>📢</span>
                    6. توعية الآخرين
                  </h4>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    شارك معرفتك عن أهمية حماية البيئة مع عائلتك وأصدقائك. كلما زاد عدد الأشخاص الذين يهتمون بالبيئة، زاد التأثير الإيجابي الذي يمكننا إحداثه.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-8 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl text-white shadow-2xl">
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  <span>💚</span>
                  رسالة مهمة من Luxora Environmental
                </h4>
                <p className="text-lg leading-relaxed">
                  حماية البيئة ليست مسؤولية شخص واحد أو منظمة واحدة - إنها مسؤولية مشتركة لنا جميعاً. كل عمل صغير نقوم به، مهما كان بسيطاً، يمكن أن يحدث فرقاً كبيراً. من خلال العمل معاً في <strong>Luxora Environmental</strong>، يمكننا إنشاء عالم أنظف وأكثر استدامة للأجيال القادمة. انضم إلينا اليوم وكن جزءاً من التغيير الإيجابي!
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              مميزات Luxora Environmental
            </h2>
            <p className="text-xl text-gray-600">
              كل ما تحتاجه لإعادة التدوير بذكاء وكفاءة
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-green-500">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">♻️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">إعادة التدوير الذكية</h3>
              <p className="text-gray-600 leading-relaxed">
                استخدم الحاويات الذكية المتطورة في Luxora Environmental واحصل على رموز الاسترداد فوراً. نظام سهل وآمن.
              </p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-blue-500">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🎁</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">النقاط والمكافآت</h3>
              <p className="text-gray-600 leading-relaxed">
                اكسب النقاط من خلال كل إعادة تدوير واستبدلها بمكافآت رائعة وحصرية. كلما أعدت تدوير أكثر، كسبت أكثر!
              </p>
            </div>
            <div className="group text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-emerald-500">
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">الحاويات الذكية</h3>
              <p className="text-gray-600 leading-relaxed">
                اعثر على أقرب حاوية ذكية لإعادة التدوير في منطقتك. خريطة تفاعلية محدثة لحظياً.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Enhanced */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">ابدأ رحلتك مع Luxora Environmental اليوم!</h3>
          <p className="text-xl md:text-2xl mb-4 text-green-50">
            انضم إلى مجتمع من آلاف الأشخاص المهتمين بالبيئة
          </p>
          <p className="text-lg mb-10 text-green-100 max-w-2xl mx-auto">
            سجل الآن مجاناً وابدأ في كسب النقاط من خلال إعادة التدوير. كل إعادة تدوير تساهم في حماية كوكبنا.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-green-50 transition-all duration-300 shadow-2xl hover:shadow-green-300/50 hover:scale-105 transform"
            >
              سجل الآن مجاناً 🚀
            </a>
            <a
              href="/rewards"
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 transform"
            >
              شاهد المكافآت المتاحة 🎁
            </a>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-green-100">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>مجاني تماماً</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>بدون التزامات</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span>مكافآت حقيقية</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
