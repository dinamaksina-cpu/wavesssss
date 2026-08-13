import type { Locale } from "@/lib/i18n";
import type { ServiceSlug } from "@/data/services";

export type ServiceDetailCopy = {
  title: string;
  intro: string;
  includedTitle: string;
  included: string[];
  audienceTitle: string;
  audience: string;
  noteTitle?: string;
  note?: string;
  priceTitle: string;
  priceLines: string[];
  priceNote: string;
};

type Category = "home" | "office" | "airbnb" | "move" | "upholstery" | "specialized" | "renovation";

export const serviceCategoryBySlug: Record<ServiceSlug, Category> = {
  "home-cleaning": "home",
  "deep-cleaning": "home",
  "office-cleaning": "office",
  "airbnb-cleaning": "airbnb",
  "move-in-out-cleaning": "move",
  "post-renovation-cleaning": "renovation",
  "carpet-cleaning": "upholstery",
  "upholstery-cleaning": "upholstery",
  "window-cleaning": "specialized",
  "specialized-cleaning": "specialized",
};

export const serviceImageByCategory: Record<Category, string> = {
  home: "/images/services/home-cleaning-wide.png",
  office: "/images/services/office-cleaning-wide.png",
  airbnb: "/images/services/airbnb-cleaning-wide.png",
  move: "/images/services/move-in-out-cleaning-wide.png",
  upholstery: "/images/services/upholstery-carpet-cleaning-wide.png",
  specialized: "/images/services/specialized-cleaning-wide.png",
  renovation: "/images/gallery/bathroom-before-after.png",
};

const copies: Record<Locale, Record<Category, ServiceDetailCopy>> = {
  uk: {
    home: {
      title: "Прибирання дому",
      intro: "Професійне прибирання квартир, будинків і вілл у Пафосі, Лімасолі та прилеглих районах. Підходить як для регулярного догляду за житлом, так і для більш ретельного глибокого прибирання.",
      includedTitle: "Що входить",
      included: ["Протирання доступних поверхонь", "Пилосос і миття підлоги", "Прибирання кухні", "Очищення ванної кімнати та сантехніки", "Дзеркала та скляні поверхні", "Винесення побутового сміття", "Додаткові роботи за попередньою домовленістю"],
      audienceTitle: "Кому підходить",
      audience: "Для квартир, приватних будинків, вілл, holiday homes і житла, яке потребує регулярного або разового прибирання.",
      priceTitle: "Вартість",
      priceLines: ["Регулярне прибирання — від €45", "Глибоке прибирання квартир і будинків — від €125"],
      priceNote: "Остаточна вартість залежить від площі, стану приміщення та обсягу робіт і підтверджується після уточнення деталей.",
    },
    office: {
      title: "Офіси та комерційні приміщення",
      intro: "Разове або регулярне професійне прибирання офісів і комерційних просторів у Пафосі, Лімасолі та прилеглих районах.",
      includedTitle: "Що входить",
      included: ["Робочі поверхні та меблі", "Пилосос і миття підлоги", "Кухонні та спільні зони", "Санітарні приміщення", "Дзеркала та скляні поверхні", "Винесення сміття", "Індивідуальний обсяг робіт за домовленістю"],
      audienceTitle: "Кому підходить",
      audience: "Офісам, невеликим магазинам, салонам, студіям та іншим комерційним приміщенням. Можливе разове або регулярне обслуговування.",
      priceTitle: "Вартість",
      priceLines: ["Прибирання офісів — від €45"],
      priceNote: "Фінальна вартість залежить від площі, частоти та необхідного обсягу робіт.",
    },
    airbnb: {
      title: "Airbnb та туристична оренда",
      intro: "Прибирання між заїздами гостей і підготовка житла до наступного бронювання. Послуга підходить для Airbnb, holiday rentals, апартаментів і вілл.",
      includedTitle: "Що входить",
      included: ["Прибирання після виїзду гостей", "Кухня та ванна кімната", "Пилосос і миття підлоги", "Підготовка житла до наступного заїзду", "Винесення сміття", "Заміна постільної білизни за домовленістю", "Повідомлення про помітні проблеми в об’єкті за потреби"],
      audienceTitle: "Кому підходить",
      audience: "Власникам і керуючим короткостроковою орендою, яким потрібне стабільне прибирання між бронюваннями.",
      priceTitle: "Вартість",
      priceLines: ["Studio / 1 Bedroom — від €40", "2 Bedroom — від €55", "3 Bedroom — від €70"],
      priceNote: "Остаточна ціна залежить від стану об’єкта та додаткових побажань.",
    },
    move: {
      title: "Перед заселенням / після виїзду",
      intro: "Ретельне прибирання квартири або будинку перед переїздом, заселенням нових мешканців або передачею об’єкта власнику.",
      includedTitle: "Що входить",
      included: ["Повне прибирання доступних приміщень", "Кухня та ванні кімнати", "Внутрішні доступні поверхні шаф за домовленістю", "Плінтуси та підлоги", "Дзеркала та скляні поверхні", "Пил і сліди повсякденного використання", "Додаткові роботи після огляду об’єкта"],
      audienceTitle: "Кому підходить",
      audience: "Орендарям, власникам, landlords, агентам нерухомості та людям, які переїжджають.",
      noteTitle: "Важливо",
      note: "Прибирання після ремонту є окремою послугою, оскільки воно потребує іншого обсягу робіт.",
      priceTitle: "Вартість",
      priceLines: ["Розраховується індивідуально"],
      priceNote: "Ціна залежить від площі, стану об’єкта та необхідного обсягу робіт.",
    },
    upholstery: {
      title: "Хімчистка меблів і килимів",
      intro: "Глибоке очищення диванів, м’яких меблів і килимів з урахуванням матеріалу, типу забруднення та загального стану поверхні.",
      includedTitle: "Що можемо очистити",
      included: ["Дивани", "Крісла", "М’які стільці", "Килими", "Окремі текстильні поверхні", "Локальні забруднення за можливості"],
      audienceTitle: "Як працюємо",
      audience: "Перед початком робіт оцінюємо матеріал і стан поверхні. Не всі плями можна видалити повністю, тому результат залежить від типу тканини, давності та характеру забруднення.",
      priceTitle: "Вартість",
      priceLines: ["Килим — від €30 за кімнату", "Комплексне очищення килимів об’єкта — від €45", "Диван 3-місний — від €39.99"],
      priceNote: "Фінальна ціна підтверджується після уточнення розміру й стану.",
    },
    specialized: {
      title: "Спеціалізоване прибирання",
      intro: "Окремі професійні послуги для зон і поверхонь, які потребують більш глибокого очищення. Їх можна замовити окремо, без повного прибирання житла.",
      includedTitle: "Доступні послуги",
      included: ["Глибоке очищення духовки — від €20", "Очищення холодильника — від €15", "Духовка + холодильник — €30", "Миття окремого вікна — €5", "Комплексне миття всіх вікон об’єкта — від €45", "Хімчистка салону автомобіля — ціна за запитом"],
      audienceTitle: "Хімчистка салону автомобіля",
      audience: "Очищення сидінь, килимків, підлоги, багажного відділення та доступних текстильних поверхонь залежно від стану автомобіля. Зовнішня мийка автомобіля не входить у послугу.",
      priceTitle: "Вартість",
      priceLines: ["Окремі послуги — згідно з прайсом вище"],
      priceNote: "Ціна залежить від розміру, стану та необхідного обсягу робіт. Перед початком ми уточнюємо деталі та підтверджуємо вартість.",
    },
    renovation: {
      title: "Прибирання після ремонту",
      intro: "Ретельне прибирання квартир, будинків та інших приміщень після ремонтних або будівельних робіт у Пафосі, Лімасолі та прилеглих районах.",
      includedTitle: "Що входить",
      included: ["Видалення будівельного пилу з доступних поверхонь", "Очищення підлоги та плінтусів", "Кухня та ванні кімнати", "Двері, рами та доступні скляні поверхні", "Повторне вологе очищення за потреби", "Додаткові роботи після оцінки об’єкта"],
      audienceTitle: "Кому підходить",
      audience: "Для житла та комерційних приміщень після ремонту, оновлення або завершення будівельних робіт.",
      priceTitle: "Вартість",
      priceLines: ["Прибирання після ремонту — від €180"],
      priceNote: "Остаточна ціна залежить від площі, кількості будівельного пилу та обсягу робіт.",
    },
  },
  en: {
    home: {title:"Home Cleaning",intro:"Professional cleaning for apartments, houses and villas in Paphos, Limassol and surrounding areas. Suitable for both regular home maintenance and more detailed deep cleaning.",includedTitle:"What’s included",included:["Wiping accessible surfaces","Vacuuming and mopping floors","Kitchen cleaning","Bathroom and sanitary cleaning","Mirrors and glass surfaces","Household waste removal","Additional tasks by prior agreement"],audienceTitle:"Who it’s for",audience:"Apartments, private homes, villas, holiday homes and properties requiring either regular or one-off cleaning.",priceTitle:"Pricing",priceLines:["Regular Cleaning — from €45","Deep Cleaning of Apartments & Houses — from €125"],priceNote:"The final price depends on the property size, condition and required scope of work and is confirmed after we review the details."},
    office: {title:"Office & Commercial Cleaning",intro:"One-off or regular professional cleaning for offices and commercial spaces in Paphos, Limassol and surrounding areas.",includedTitle:"What’s included",included:["Work surfaces and furniture","Vacuuming and mopping floors","Kitchen and shared areas","Washrooms","Mirrors and glass surfaces","Waste removal","Custom scope of work by agreement"],audienceTitle:"Who it’s for",audience:"Offices, small shops, salons, studios and other commercial premises. Available as a one-off or recurring service.",priceTitle:"Pricing",priceLines:["Office Cleaning — from €45"],priceNote:"The final price depends on the size, frequency and required scope of work."},
    airbnb: {title:"Airbnb & Holiday Rental Cleaning",intro:"Turnover cleaning between guest stays and preparation of the property for the next booking. Suitable for Airbnb, holiday rentals, apartments and villas.",includedTitle:"What’s included",included:["Cleaning after guest departure","Kitchen and bathroom cleaning","Vacuuming and mopping","Preparing the property for the next arrival","Waste removal","Linen change by prior agreement","Reporting visible property issues when required"],audienceTitle:"Who it’s for",audience:"Owners and managers of short-term rental properties who need reliable cleaning between bookings.",priceTitle:"Pricing",priceLines:["Studio / 1 Bedroom — from €40","2 Bedroom — from €55","3 Bedroom — from €70"],priceNote:"The final price depends on the property condition and any additional requirements."},
    move: {title:"Move-In / Move-Out Cleaning",intro:"Detailed cleaning of an apartment or house before moving in, after moving out or before handing the property over to the owner or next occupants.",includedTitle:"What’s included",included:["Full cleaning of accessible areas","Kitchen and bathrooms","Accessible cupboard interiors by agreement","Skirting boards and floors","Mirrors and glass surfaces","Dust and signs of everyday use","Additional work after reviewing the property"],audienceTitle:"Who it’s for",audience:"Tenants, homeowners, landlords, property agents and anyone preparing for a move.",noteTitle:"Important",note:"Post-renovation cleaning is a separate service because it requires a different scope of work.",priceTitle:"Pricing",priceLines:["Quoted individually"],priceNote:"Pricing depends on the size, condition and required scope of work."},
    upholstery: {title:"Upholstery & Carpet Cleaning",intro:"Deep cleaning for sofas, upholstered furniture and carpets, taking into account the material, type of staining and overall condition.",includedTitle:"What we can clean",included:["Sofas","Armchairs","Upholstered chairs","Carpets","Selected textile surfaces","Localised staining where possible"],audienceTitle:"How it works",audience:"Before cleaning, we assess the material and condition of the surface. Not every stain can be completely removed, so results depend on the fabric, age and type of contamination.",priceTitle:"Pricing",priceLines:["Carpet Cleaning — from €30 per room","Complete carpet cleaning for a property — from €45","3-seater sofa — from €39.99"],priceNote:"The final price is confirmed after we review the size and condition."},
    specialized: {title:"Specialized Cleaning",intro:"Individual professional services for areas and surfaces that require more detailed cleaning. These services can be booked separately without a full property clean.",includedTitle:"Available services",included:["Oven deep clean — from €20","Refrigerator cleaning — from €15","Oven + refrigerator bundle — €30","Individual window cleaning — €5 per window","Full-property window cleaning — from €45","Car interior detailing — quote on request"],audienceTitle:"Car Interior Cleaning",audience:"Cleaning of seats, mats, flooring, luggage area and accessible textile surfaces depending on the condition of the vehicle. Exterior car washing is not included.",priceTitle:"Pricing",priceLines:["Individual services — as listed above"],priceNote:"Pricing depends on size, condition and required scope of work. We confirm the details and final price before the service."},
    renovation: {title:"Post-Renovation Cleaning",intro:"Detailed cleaning for apartments, houses and other premises after renovation or construction work in Paphos, Limassol and surrounding areas.",includedTitle:"What’s included",included:["Removing construction dust from accessible surfaces","Cleaning floors and skirting boards","Kitchen and bathrooms","Doors, frames and accessible glass surfaces","Repeated damp cleaning where required","Additional work after reviewing the property"],audienceTitle:"Who it’s for",audience:"Homes and commercial premises after renovation, refurbishment or completed building work.",priceTitle:"Pricing",priceLines:["Post-Renovation Cleaning — from €180"],priceNote:"The final price depends on the size, amount of construction dust and required scope of work."},
  },
  ru: {
    home: {title:"Уборка дома",intro:"Профессиональная уборка квартир, домов и вилл в Пафосе, Лимассоле и ближайших районах. Подходит как для регулярного ухода за жильём, так и для более тщательной генеральной уборки.",includedTitle:"Что входит",included:["Протирание доступных поверхностей","Пылесос и мытьё полов","Уборка кухни","Уборка ванной комнаты и сантехники","Зеркала и стеклянные поверхности","Вынос бытового мусора","Дополнительные работы по предварительной договорённости"],audienceTitle:"Кому подходит",audience:"Квартирам, частным домам, виллам, holiday homes и жилью, которому требуется регулярная или разовая уборка.",priceTitle:"Стоимость",priceLines:["Регулярная уборка — от €45","Глубокая уборка квартир и домов — от €125"],priceNote:"Окончательная стоимость зависит от площади, состояния помещения и объёма работ и подтверждается после уточнения деталей."},
    office: {title:"Офисы и коммерческие помещения",intro:"Разовая или регулярная профессиональная уборка офисов и коммерческих помещений в Пафосе, Лимассоле и ближайших районах.",includedTitle:"Что входит",included:["Рабочие поверхности и мебель","Пылесос и мытьё полов","Кухонные и общие зоны","Санитарные помещения","Зеркала и стеклянные поверхности","Вынос мусора","Индивидуальный объём работ по договорённости"],audienceTitle:"Кому подходит",audience:"Офисам, небольшим магазинам, салонам, студиям и другим коммерческим помещениям. Возможна разовая или регулярная уборка.",priceTitle:"Стоимость",priceLines:["Уборка офиса — от €45"],priceNote:"Окончательная стоимость зависит от площади, частоты и необходимого объёма работ."},
    airbnb: {title:"Airbnb и туристическая аренда",intro:"Уборка между заездами гостей и подготовка жилья к следующему бронированию. Подходит для Airbnb, holiday rentals, апартаментов и вилл.",includedTitle:"Что входит",included:["Уборка после выезда гостей","Кухня и ванная комната","Пылесос и мытьё полов","Подготовка жилья к следующему заезду","Вынос мусора","Замена постельного белья по договорённости","Сообщение о заметных проблемах в объекте при необходимости"],audienceTitle:"Кому подходит",audience:"Владельцам и управляющим краткосрочной арендой, которым нужна стабильная уборка между бронированиями.",priceTitle:"Стоимость",priceLines:["Studio / 1 Bedroom — от €40","2 Bedroom — от €55","3 Bedroom — от €70"],priceNote:"Окончательная цена зависит от состояния объекта и дополнительных пожеланий."},
    move: {title:"Уборка перед заселением / после выезда",intro:"Тщательная уборка квартиры или дома перед переездом, после выезда или перед передачей объекта владельцу либо новым жильцам.",includedTitle:"Что входит",included:["Полная уборка доступных помещений","Кухня и ванные комнаты","Доступные внутренние поверхности шкафов по договорённости","Плинтусы и полы","Зеркала и стеклянные поверхности","Пыль и следы повседневного использования","Дополнительные работы после оценки объекта"],audienceTitle:"Кому подходит",audience:"Арендаторам, владельцам, landlords, агентам недвижимости и тем, кто готовится к переезду.",noteTitle:"Важно",note:"Уборка после ремонта является отдельной услугой, так как требует другого объёма работ.",priceTitle:"Стоимость",priceLines:["Рассчитывается индивидуально"],priceNote:"Цена зависит от площади, состояния объекта и необходимого объёма работ."},
    upholstery: {title:"Химчистка мебели и ковров",intro:"Глубокая очистка диванов, мягкой мебели и ковров с учётом материала, типа загрязнения и общего состояния поверхности.",includedTitle:"Что можем очистить",included:["Диваны","Кресла","Мягкие стулья","Ковры","Отдельные текстильные поверхности","Локальные загрязнения, если это возможно"],audienceTitle:"Как работаем",audience:"Перед началом работ оцениваем материал и состояние поверхности. Не все пятна можно удалить полностью, поэтому результат зависит от ткани, давности и характера загрязнения.",priceTitle:"Стоимость",priceLines:["Ковры — от €30 за комнату","Комплексная чистка ковров объекта — от €45","Трёхместный диван — от €39.99"],priceNote:"Финальная цена подтверждается после уточнения размера и состояния."},
    specialized: {title:"Специализированная уборка",intro:"Отдельные профессиональные услуги для зон и поверхностей, которым требуется более глубокая очистка. Их можно заказать отдельно без полной уборки помещения.",includedTitle:"Доступные услуги",included:["Глубокая чистка духовки — от €20","Чистка холодильника — от €15","Духовка + холодильник — €30","Мытьё отдельного окна — €5 за окно","Комплексное мытьё всех окон объекта — от €45","Химчистка салона автомобиля — цена по запросу"],audienceTitle:"Химчистка салона автомобиля",audience:"Очистка сидений, ковриков, пола, багажного отделения и доступных текстильных поверхностей в зависимости от состояния автомобиля. Внешняя мойка автомобиля в услугу не входит.",priceTitle:"Стоимость",priceLines:["Отдельные услуги — согласно ценам выше"],priceNote:"Цена зависит от размера, состояния и необходимого объёма работ. Перед началом мы уточняем детали и подтверждаем стоимость."},
    renovation: {title:"Уборка после ремонта",intro:"Тщательная уборка квартир, домов и других помещений после ремонтных или строительных работ в Пафосе, Лимассоле и ближайших районах.",includedTitle:"Что входит",included:["Удаление строительной пыли с доступных поверхностей","Очистка полов и плинтусов","Кухня и ванные комнаты","Двери, рамы и доступные стеклянные поверхности","Повторная влажная уборка при необходимости","Дополнительные работы после оценки объекта"],audienceTitle:"Кому подходит",audience:"Жилым и коммерческим помещениям после ремонта, обновления или завершения строительных работ.",priceTitle:"Стоимость",priceLines:["Уборка после ремонта — от €180"],priceNote:"Окончательная цена зависит от площади, количества строительной пыли и объёма работ."},
  },
  el: {
    home: {title:"Καθαρισμός Κατοικίας",intro:"Επαγγελματικός καθαρισμός διαμερισμάτων, κατοικιών και επαύλεων στην Πάφο, τη Λεμεσό και τις γύρω περιοχές. Κατάλληλος τόσο για τακτική συντήρηση όσο και για πιο λεπτομερή βαθύ καθαρισμό.",includedTitle:"Τι περιλαμβάνει",included:["Καθαρισμό προσβάσιμων επιφανειών","Σκούπισμα και σφουγγάρισμα δαπέδων","Καθαρισμό κουζίνας","Καθαρισμό μπάνιου και ειδών υγιεινής","Καθρέφτες και γυάλινες επιφάνειες","Απομάκρυνση οικιακών απορριμμάτων","Πρόσθετες εργασίες κατόπιν συνεννόησης"],audienceTitle:"Για ποιον είναι κατάλληλο",audience:"Για διαμερίσματα, ιδιωτικές κατοικίες, επαύλεις, holiday homes και ακίνητα που χρειάζονται τακτικό ή εφάπαξ καθαρισμό.",priceTitle:"Τιμή",priceLines:["Τακτικός καθαρισμός — από €45","Βαθύς καθαρισμός διαμερισμάτων και κατοικιών — από €125"],priceNote:"Η τελική τιμή εξαρτάται από το μέγεθος, την κατάσταση του χώρου και το εύρος των εργασιών και επιβεβαιώνεται αφού λάβουμε τις λεπτομέρειες."},
    office: {title:"Καθαρισμός Γραφείων & Επαγγελματικών Χώρων",intro:"Εφάπαξ ή τακτικός επαγγελματικός καθαρισμός γραφείων και επαγγελματικών χώρων στην Πάφο, τη Λεμεσό και τις γύρω περιοχές.",includedTitle:"Τι περιλαμβάνει",included:["Επιφάνειες εργασίας και έπιπλα","Σκούπισμα και σφουγγάρισμα δαπέδων","Κουζίνα και κοινόχρηστοι χώροι","Χώρους υγιεινής","Καθρέφτες και γυάλινες επιφάνειες","Απομάκρυνση απορριμμάτων","Προσαρμοσμένο εύρος εργασιών κατόπιν συνεννόησης"],audienceTitle:"Για ποιον είναι κατάλληλο",audience:"Για γραφεία, μικρά καταστήματα, σαλόνια, studios και άλλους επαγγελματικούς χώρους. Διατίθεται ως εφάπαξ ή τακτική υπηρεσία.",priceTitle:"Τιμή",priceLines:["Καθαρισμός γραφείου — από €45"],priceNote:"Η τελική τιμή εξαρτάται από το μέγεθος, τη συχνότητα και το απαιτούμενο εύρος εργασιών."},
    airbnb: {title:"Καθαρισμός Airbnb & Τουριστικών Καταλυμάτων",intro:"Καθαρισμός μεταξύ αναχωρήσεων και αφίξεων και προετοιμασία του ακινήτου για την επόμενη κράτηση. Κατάλληλο για Airbnb, holiday rentals, διαμερίσματα και επαύλεις.",includedTitle:"Τι περιλαμβάνει",included:["Καθαρισμό μετά την αναχώρηση των επισκεπτών","Καθαρισμό κουζίνας και μπάνιου","Σκούπισμα και σφουγγάρισμα","Προετοιμασία του ακινήτου για την επόμενη άφιξη","Απομάκρυνση απορριμμάτων","Αλλαγή λευκών ειδών κατόπιν συνεννόησης","Ενημέρωση για εμφανή προβλήματα στο ακίνητο όταν χρειάζεται"],audienceTitle:"Για ποιον είναι κατάλληλο",audience:"Για ιδιοκτήτες και διαχειριστές βραχυχρόνιων μισθώσεων που χρειάζονται αξιόπιστο καθαρισμό μεταξύ κρατήσεων.",priceTitle:"Τιμή",priceLines:["Studio / 1 Bedroom — από €40","2 Bedroom — από €55","3 Bedroom — από €70"],priceNote:"Η τελική τιμή εξαρτάται από την κατάσταση του ακινήτου και τυχόν πρόσθετες απαιτήσεις."},
    move: {title:"Καθαρισμός Πριν την Εγκατάσταση / Μετά την Αποχώρηση",intro:"Λεπτομερής καθαρισμός διαμερίσματος ή κατοικίας πριν από μετακόμιση, μετά από αποχώρηση ή πριν από την παράδοση του ακινήτου στον ιδιοκτήτη ή στους επόμενους ενοίκους.",includedTitle:"Τι περιλαμβάνει",included:["Πλήρη καθαρισμό προσβάσιμων χώρων","Κουζίνα και μπάνια","Προσβάσιμα εσωτερικά ντουλαπιών κατόπιν συνεννόησης","Σοβατεπί και δάπεδα","Καθρέφτες και γυάλινες επιφάνειες","Σκόνη και σημάδια καθημερινής χρήσης","Πρόσθετες εργασίες μετά την αξιολόγηση του ακινήτου"],audienceTitle:"Για ποιον είναι κατάλληλο",audience:"Για ενοικιαστές, ιδιοκτήτες, landlords, μεσίτες και όσους ετοιμάζονται για μετακόμιση.",noteTitle:"Σημαντικό",note:"Ο καθαρισμός μετά από ανακαίνιση είναι ξεχωριστή υπηρεσία, καθώς απαιτεί διαφορετικό εύρος εργασιών.",priceTitle:"Τιμή",priceLines:["Υπολογίζεται εξατομικευμένα"],priceNote:"Η τιμή εξαρτάται από το μέγεθος, την κατάσταση και το απαιτούμενο εύρος εργασιών."},
    upholstery: {title:"Καθαρισμός Ταπετσαριών & Χαλιών",intro:"Βαθύς καθαρισμός καναπέδων, υφασμάτινων επίπλων και χαλιών, λαμβάνοντας υπόψη το υλικό, το είδος του λεκέ και τη συνολική κατάσταση της επιφάνειας.",includedTitle:"Τι μπορούμε να καθαρίσουμε",included:["Καναπέδες","Πολυθρόνες","Υφασμάτινες καρέκλες","Χαλιά","Επιλεγμένες υφασμάτινες επιφάνειες","Τοπικούς λεκέδες όπου είναι εφικτό"],audienceTitle:"Πώς δουλεύουμε",audience:"Πριν από τον καθαρισμό αξιολογούμε το υλικό και την κατάσταση της επιφάνειας. Δεν είναι δυνατό να αφαιρεθούν όλοι οι λεκέδες πλήρως, επομένως το αποτέλεσμα εξαρτάται από το ύφασμα, την παλαιότητα και το είδος της ρύπανσης.",priceTitle:"Τιμή",priceLines:["Καθαρισμός χαλιού — από €30 ανά δωμάτιο","Πλήρης καθαρισμός χαλιών ακινήτου — από €45","Τριθέσιος καναπές — από €39.99"],priceNote:"Η τελική τιμή επιβεβαιώνεται αφού αξιολογήσουμε το μέγεθος και την κατάσταση."},
    specialized: {title:"Εξειδικευμένος Καθαρισμός",intro:"Μεμονωμένες επαγγελματικές υπηρεσίες για χώρους και επιφάνειες που χρειάζονται πιο βαθύ καθαρισμό. Μπορούν να κλειστούν ξεχωριστά χωρίς πλήρη καθαρισμό του ακινήτου.",includedTitle:"Διαθέσιμες υπηρεσίες",included:["Βαθύς καθαρισμός φούρνου — από €20","Καθαρισμός ψυγείου — από €15","Φούρνος + ψυγείο — €30","Καθαρισμός μεμονωμένου παραθύρου — €5 ανά παράθυρο","Καθαρισμός όλων των παραθύρων ακινήτου — από €45","Καθαρισμός εσωτερικού αυτοκινήτου — τιμή κατόπιν προσφοράς"],audienceTitle:"Καθαρισμός Εσωτερικού Αυτοκινήτου",audience:"Καθαρισμός καθισμάτων, πατακιών, δαπέδου, χώρου αποσκευών και προσβάσιμων υφασμάτινων επιφανειών, ανάλογα με την κατάσταση του οχήματος. Το εξωτερικό πλύσιμο του αυτοκινήτου δεν περιλαμβάνεται.",priceTitle:"Τιμή",priceLines:["Μεμονωμένες υπηρεσίες — σύμφωνα με τις τιμές παραπάνω"],priceNote:"Η τιμή εξαρτάται από το μέγεθος, την κατάσταση και το απαιτούμενο εύρος εργασιών. Επιβεβαιώνουμε τις λεπτομέρειες και την τελική τιμή πριν από την υπηρεσία."},
    renovation: {title:"Καθαρισμός Μετά από Ανακαίνιση",intro:"Λεπτομερής καθαρισμός διαμερισμάτων, κατοικιών και άλλων χώρων μετά από ανακαίνιση ή οικοδομικές εργασίες στην Πάφο, τη Λεμεσό και τις γύρω περιοχές.",includedTitle:"Τι περιλαμβάνει",included:["Αφαίρεση οικοδομικής σκόνης από προσβάσιμες επιφάνειες","Καθαρισμό δαπέδων και σοβατεπί","Κουζίνα και μπάνια","Πόρτες, πλαίσια και προσβάσιμες γυάλινες επιφάνειες","Επαναλαμβανόμενο υγρό καθάρισμα όπου χρειάζεται","Πρόσθετες εργασίες μετά την αξιολόγηση του ακινήτου"],audienceTitle:"Για ποιον είναι κατάλληλο",audience:"Για κατοικίες και επαγγελματικούς χώρους μετά από ανακαίνιση, ανανέωση ή ολοκλήρωση οικοδομικών εργασιών.",priceTitle:"Τιμή",priceLines:["Καθαρισμός μετά από ανακαίνιση — από €180"],priceNote:"Η τελική τιμή εξαρτάται από το μέγεθος, την ποσότητα οικοδομικής σκόνης και το απαιτούμενο εύρος εργασιών."},
  },
};

export function getServiceDetailCopy(locale: Locale, slug: ServiceSlug): ServiceDetailCopy {
  return copies[locale][serviceCategoryBySlug[slug]];
}
