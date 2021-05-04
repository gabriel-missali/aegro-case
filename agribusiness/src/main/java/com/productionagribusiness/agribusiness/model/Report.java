package com.productionagribusiness.agribusiness.model;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Report {

    private String monthYear;
    private Integer total;

    public Report(String monthYear, Integer total) {
        this.monthYear = monthYear;
        this.total = total;
    }
}
