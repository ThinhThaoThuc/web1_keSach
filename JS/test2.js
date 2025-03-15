document.getElementById('filterButton').addEventListener('click', function() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const orderStatus = document.getElementById('orderStatus').value;

    const rows = document.querySelectorAll('tbody tr');
    const filteredRows = [];

    rows.forEach(row => {
        const orderTime = row.cells[2].textContent;
        const status = row.cells[0].textContent;

        // Kiểm tra điều kiện lọc
        const isDateInRange = (!startDate || new Date(orderTime) >= new Date(startDate)) &&
                              (!endDate || new Date(orderTime) <= new Date(endDate));
        const isStatusMatch = !orderStatus || status === orderStatus;

        // Hiển thị hoặc ẩn hàng dựa trên điều kiện lọc
        if (isDateInRange && isStatusMatch) {
            row.style.display = '';
            filteredRows.push(row);
        } else {
            row.style.display = 'none';
        }
    });

    // Sắp xếp các hàng đã lọc theo quận (giả sử quận nằm ở cột thứ nhất)
    filteredRows.sort((a, b) => {
        const districtA = a.cells[1].textContent; // Thay đổi chỉ số cột nếu cần
        const districtB = b.cells[1].textContent; // Thay đổi chỉ số cột nếu cần
        return districtA.localeCompare(districtB);
    });

    // Thêm các hàng đã sắp xếp vào bảng
    const tbody = document.querySelector('tbody');
    filteredRows.forEach(row => {
        tbody.appendChild(row);
    });
});