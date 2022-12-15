// 1) разделить данные на ФИО и должность
parseEmployeesData(
	`
  Порфирьева Ксения  Сергеевна, разработчик
  Масленников Иван Александрович , бариста `
);

function parseEmployeesData(datastring) {
	console.log(
		datastring
			.split('\n')
			.filter(line => line.trim().length > 0)
			.map(line => {
				const [fullName, occupation] = line
					.split(',')
					.map(str => str.trim())
					.filter(text => text.length > 0);
				const [surname, name, middleName] = fullName
					.split(' ')
					.filter(text => text.length > 0);
				return {
					surname,
					name,
					middleName,
					occupation,
				};
			})
	);
}

// 2) Найти на странице ссылки и получить тольок доменные имена
// function getPageLinkDomains() {
// 	return Array.from(document.getElementsByTagName('a'))
// 		.map(link =>
// 			link.href
// 				.replace('http://', '')
// 				.replace('https://', '')
// 				.replace('www', '')
// 				.split('/')
// 				.shift()
// 		)
// 		.reduce((unique, domain) => {
// 			if (unique.includes(domain)) return unique;
// 			return [...unique, domain];
// 		}, []);
// }
