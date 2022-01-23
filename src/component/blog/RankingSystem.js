import React, { Component } from "react";
import "../../css/blog.css";

export default class RankingSystem extends Component {
  render() {
    return (
      <div className="Ranking-system">
        <div className="Ranking-system-head">
          <div className="head-Blogs">Blogs :-</div>
          <div className="head-Rank">Ranking System .....</div>
        </div>
        <div className="Ranking-system-body">
          <div className="Ranking-system-body-head">About it :-</div>
          <div className="Ranking-system-body-body">
            The ranking system in Virtual office is for what kind of authority
            the person has in the organiztion. One can see how to set the other
            members raking according to what kind of rank they want to give to
            the person. The rank with a as suffix is the one holding all the 
            authority of its number, except to change the rank of 1 lesser one.
            Every rank has the authority to change the rank of 1 less rank.
            The rank 1 has all the authority to do anything.
          </div>
          <div className="Ranking-system-acronym">
            <div className="Ranking-system-body-head">Acronynms</div>
            <ul>
              <li>R.C. :- Rank changing for lower rank</li>
              <li>A.D. :- Add new department </li>
              <li>A.P. :- Add new project</li>
              <li>A.E. :- Add new employee</li>
              <li>G.T. :- Generate team</li>
              <li>A.E.B. :- Add Employee to branch</li>
            </ul>
          </div>
          <table className="rank-table">
            <tr className="rank-table-row">
              <th className="rank-table-head-content">Rank</th>
              <th className="rank-table-head-content">R.C.</th>
              <th className="rank-table-head-content">A.D.</th>
              <th className="rank-table-head-content">A.P.</th>
              <th className="rank-table-head-content">A.E.</th>
              <th className="rank-table-head-content">G.T.</th>
              <th className="rank-table-head-content">A.E.B.</th>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">1</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">1a</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">2</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">2a</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">3</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">3a</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">4</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">4a</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">yes</td>
            </tr>
            <tr className="rank-table-row">
              <td className="rank-table-row-content">5</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
              <td className="rank-table-row-content">no</td>
            </tr>
          </table>
          <div className = "para-with-heading">
            <div className = "para-with-heading-head">
                Note : 
            </div>
            <div className = "para-with-heading-body">
                For Placing Notice only Rank 1 and Rank 1a are allowed to give notice for 
                each department and company and all other (except rank 5) will be only given option for their respective department and company only.
                Rank 5 dont have authority to place notice.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
