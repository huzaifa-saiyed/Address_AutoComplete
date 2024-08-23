require([
    "jquery",
    "mage/url",
    "jquery/ui",
], function ($, urlBuilder) {
    $(function () {
        var noResult = false;
        var displayAddress = new Set();

        $("#street_1").on("input", function () {
            var currentValue = $(this).val();

            if (!currentValue || currentValue.length === 0) {
                $("#address").empty();
                noResult = false;
                displayAddress.clear();
            }
        });

        $("#street_1").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: urlBuilder.build(
                        "kitchen365_autocomplete/autocomplete/street"
                    ),
                    data: {
                        street: $("#street_1").val(),
                    },
                    success: function (data) {
                        var autoCompleteAddress = "";
                        $.each(data.addresses, function (index, address) {
                            if (!displayAddress.has(address)) {
                                // console.log(!displayAddress.has(address));
                                autoCompleteAddress +=
                                    '<li class="ui-menu-item"><a href="javascript:void(0)" class="autocomplete-address">' +
                                    address +
                                    "</a></li>";
                                displayAddress.add(address);
                            }
                        });

                        if (!autoCompleteAddress) {
                            // console.log(!autoCompleteAddress);
                            if (!noResult) {
                                autoCompleteAddress +=
                                    '<li class="ui-menu-item"><span>No result.</span></li>';
                                noResult = true;
                            }
                        }

                        $("#address").append(autoCompleteAddress);

                        $("#address").find(".autocomplete-address").on("click", function () {
                            var selectedAddress = $(this).text();
                            $("#street_1").val(selectedAddress);
                            $("#address").empty();
                        });
                    },
                });
            },
        });
    });
});
